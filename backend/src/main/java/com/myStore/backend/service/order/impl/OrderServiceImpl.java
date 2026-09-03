package com.myStore.backend.service.order.impl;

import com.myStore.backend.dto.order.CreateOrderRequestDTO;
import com.myStore.backend.dto.order.OrderItemRequestDTO;
import com.myStore.backend.dto.order.OrderItemResponseDTO;
import com.myStore.backend.dto.order.OrderResponseDTO;
import com.myStore.backend.exception.BadRequestException;
import com.myStore.backend.exception.ResourceNotFoundException;
import com.myStore.backend.model.Order;
import com.myStore.backend.model.OrderItem;
import com.myStore.backend.model.Product;
import com.myStore.backend.model.User;
import com.myStore.backend.model.enums.OrderStatusEnum;
import com.myStore.backend.repository.OrderRepository;
import com.myStore.backend.repository.ProductRepository;
import com.myStore.backend.repository.UserRepository;
import com.myStore.backend.service.order.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public OrderResponseDTO createOrder(UUID userId, CreateOrderRequestDTO dto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + userId));

        Order order = Order.builder()
                .user(user)
                .status(OrderStatusEnum.PENDING)
                .totalAmount(BigDecimal.ZERO)
                .build();

        BigDecimal totalAmount = BigDecimal.ZERO;

        for (OrderItemRequestDTO itemDto : dto.items()) {
            Product product = productRepository.findById(itemDto.productId())
                    .orElseThrow(() -> new ResourceNotFoundException("Product not found with ID: " + itemDto.productId()));

            if (!Boolean.TRUE.equals(product.getIsActive())) {
                throw new BadRequestException("Product '" + product.getName() + "' is not active");
            }

            if (product.getStock() < itemDto.quantity()) {
                throw new BadRequestException("Insufficient stock for product '" + product.getName() + 
                        "'. Available: " + product.getStock() + 
                        ", Requested: " + itemDto.quantity());
            }

            BigDecimal unitPrice = product.getPrice();
            BigDecimal subtotal = unitPrice.multiply(BigDecimal.valueOf(itemDto.quantity()));
            totalAmount = totalAmount.add(subtotal);

            OrderItem orderItem = OrderItem.builder()
                    .product(product)
                    .quantity(itemDto.quantity())
                    .unitPrice(unitPrice)
                    .build();

            order.addItem(orderItem);
        }

        order.setTotalAmount(totalAmount);
        Order savedOrder = orderRepository.save(order);

        return mapToOrderResponseDTO(savedOrder);
    }

    @Override
    @Transactional(readOnly = true)
    public OrderResponseDTO getOrderById(UUID orderId, UUID userId) {
        Order order = orderRepository.findByIdAndUserId(orderId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with ID: " + orderId + " for user ID: " + userId));
        return mapToOrderResponseDTO(order);
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderResponseDTO> getUserOrders(UUID userId) {
        return orderRepository.findByUserIdOrderByCreatedAtDesc(userId).stream()
                .map(this::mapToOrderResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderResponseDTO> getAllOrders() {
        return orderRepository.findAll().stream()
                .map(this::mapToOrderResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void updateOrderStatus(UUID orderId, OrderStatusEnum newStatus) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with ID: " + orderId));
        
        order.setStatus(newStatus);
        orderRepository.save(order);
    }

    private OrderResponseDTO mapToOrderResponseDTO(Order order) {
        List<OrderItemResponseDTO> itemDTOs = order.getItems().stream()
                .map(item -> new OrderItemResponseDTO(
                        item.getId(),
                        item.getProduct().getId(),
                        item.getProduct().getName(),
                        item.getQuantity(),
                        item.getUnitPrice(),
                        item.getUnitPrice().multiply(BigDecimal.valueOf(item.getQuantity()))
                ))
                .collect(Collectors.toList());

        return new OrderResponseDTO(
                order.getId(),
                order.getUser().getId(),
                order.getTotalAmount(),
                order.getStatus(),
                itemDTOs,
                order.getCreatedAt(),
                order.getUpdatedAt()
        );
    }
}
