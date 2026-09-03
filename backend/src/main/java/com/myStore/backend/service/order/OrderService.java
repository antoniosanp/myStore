package com.myStore.backend.service.order;

import com.myStore.backend.dto.order.CreateOrderRequestDTO;
import com.myStore.backend.dto.order.OrderResponseDTO;
import com.myStore.backend.model.enums.OrderStatusEnum;

import java.util.List;
import java.util.UUID;

public interface OrderService {

    OrderResponseDTO createOrder(UUID userId, CreateOrderRequestDTO dto);

    OrderResponseDTO getOrderById(UUID orderId, UUID userId);

    List<OrderResponseDTO> getUserOrders(UUID userId);

    List<OrderResponseDTO> getAllOrders();

    void updateOrderStatus(UUID orderId, OrderStatusEnum newStatus);
}
