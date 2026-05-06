package com.example.demo.service;

import com.example.demo.entity.Product;
import com.example.demo.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ProductRepository productRepository;

    public String processMessage(String message) {

        String text = message.toLowerCase();

        List<Product> products = productRepository.findAll();

        for (Product product : products) {

            String name = product.getName().toLowerCase();

            if (text.contains(name)) {

                if (text.contains("stok")) {
                    return product.getName() +
                            " tersedia stok " +
                            product.getStock();
                }

                if (text.contains("harga")) {
                    return product.getName() +
                            " memiliki harga Rp " +
                            product.getPrice();
                }
            }
        }

        if (text.contains("rekomendasi")) {
            return "Kami merekomendasikan sepatu running dan sneakers terbaru.";
        }

        return "Maaf, produk tidak ditemukan atau pertanyaan belum tersedia.";
    }
}