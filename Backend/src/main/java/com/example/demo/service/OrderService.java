package com.example.demo.service;

import com.example.demo.entity.Order;
import com.example.demo.entity.Product;
import com.example.demo.repository.OrderRepository;
import com.example.demo.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;

    public List<Order> getAll() {
        return orderRepository.findAll();
    }

    public Order getById(Long id) {
        return orderRepository.findById(id).orElse(null);
    }

    public Order save(Order order) {
        return orderRepository.save(order);
    }

    public Order updateStatus(Long id, String status) {

        Order order = orderRepository.findById(id).orElse(null);

        if (order == null) {
            return null;
        }

        order.setStatus(status);

        if (status.equalsIgnoreCase("PAID")) {

            Product product = productRepository
                    .findByName(order.getProductName())
                    .orElse(null);

            if (product != null) {
                int newStock =
                        product.getStock() - order.getQuantity();

                product.setStock(Math.max(newStock, 0));

                productRepository.save(product);
            }
        }

        return orderRepository.save(order);
    }

    public boolean delete(Long id) {

        Order order = orderRepository.findById(id).orElse(null);

        if (order == null) {
            return false;
        }

        orderRepository.delete(order);
        return true;
    }
}