package com.example.demo.service;

import com.example.demo.repository.OrderRepository;
import com.example.demo.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;

    public Map<String, Object> getSummary() {

        Map<String, Object> data = new HashMap<>();

        long totalProducts = productRepository.count();
        long totalOrders = orderRepository.count();

        BigDecimal totalSales = orderRepository.findAll()
                .stream()
                .map(order -> order.getTotalPrice() == null
                        ? BigDecimal.ZERO
                        : order.getTotalPrice())
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        data.put("totalProducts", totalProducts);
        data.put("totalOrders", totalOrders);
        data.put("totalSales", totalSales);

        return data;
    }
}