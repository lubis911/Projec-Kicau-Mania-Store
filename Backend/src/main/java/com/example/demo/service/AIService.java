package com.example.demo.service;

import com.example.demo.entity.AiLog;
import com.example.demo.entity.Faq;
import com.example.demo.entity.Product;
import com.example.demo.repository.AiLogRepository;
import com.example.demo.repository.FaqRepository;
import com.example.demo.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AIService {

    private final ProductRepository productRepository;
    private final FaqRepository faqRepository;
    private final AiLogRepository aiLogRepository;

    @Value("${gemini.api.key}")
    private String apiKey;

    @Value("${gemini.api.url}")
    private String apiUrl;

    public String askGemini(String question) {

        String q = question.toLowerCase();

        List<Faq> faqs = faqRepository.findAll();

        for (Faq faq : faqs) {
            if (q.contains(faq.getQuestion().toLowerCase())) {

                saveLog(question, faq.getAnswer(), true);

                return faq.getAnswer();
            }
        }

        List<Product> products = productRepository.findAll();

        if (
            q.contains("produk") ||
            q.contains("sepatu") ||
            q.contains("harga") ||
            q.contains("stok") ||
            q.contains("jual")
        ) {

            if (products.isEmpty()) {
                return "Saat ini produk belum tersedia.";
            }

            StringBuilder localAnswer = new StringBuilder();

            localAnswer.append("Halo! Berikut produk kami:\n\n");

            int no = 1;

            for (Product p : products) {
                localAnswer.append(no++)
                        .append(". ")
                        .append(p.getName())
                        .append(" (")
                        .append(p.getCategory().getName())
                        .append(")")
                        .append("\nHarga: Rp ")
                        .append(p.getPrice())
                        .append("\nStock: ")
                        .append(p.getStock())
                        .append("\n\n");
            }

            localAnswer.append("Silakan pilih produk yang Anda suka.");

            saveLog(question, localAnswer.toString(), true);

            return localAnswer.toString();
        }

        StringBuilder productList = new StringBuilder();

        for (Product p : products) {
            productList.append("Nama: ")
                    .append(p.getName())
                    .append(", Harga: ")
                    .append(p.getPrice())
                    .append(", Stock: ")
                    .append(p.getStock())
                    .append(", Kategori: ")
                    .append(p.getCategory().getName())
                    .append("\n");
        }

        String prompt = """
Kamu adalah AI Assistant resmi Kicau Mania Store.

Data produk toko:

""" + productList + """

Aturan:
- Jawab Bahasa Indonesia
- Ramah, profesional
- Jika bisa, rekomendasikan produk toko
- Jika pertanyaan di luar toko, arahkan ke sepatu

Pertanyaan customer:
""" + question;

        RestTemplate restTemplate = new RestTemplate();

        Map<String, Object> body = Map.of(
                "contents", new Object[]{
                        Map.of(
                                "parts", new Object[]{
                                        Map.of("text", prompt)
                                }
                        )
                }
        );

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> entity =
                new HttpEntity<>(body, headers);

        try {

            Map response = restTemplate.postForObject(
                    apiUrl + "?key=" + apiKey,
                    entity,
                    Map.class
            );

            var candidates =
                    (java.util.List<Map<String, Object>>) response.get("candidates");

            var content =
                    (Map<String, Object>) candidates.get(0).get("content");

            var parts =
                    (java.util.List<Map<String, Object>>) content.get("parts");

            String answer =
                    parts.get(0).get("text").toString();

            saveLog(question, answer, true);

            return answer;

        } catch (Exception e) {

            saveLog(question, "AI Error", false);

            return "AI sedang sibuk, coba lagi sebentar.";
        }
    }

    private void saveLog(
            String question,
            String answer,
            Boolean success
    ) {

        AiLog log = new AiLog();

        log.setPromptSent(question);
        log.setResponseReceived(answer);
        log.setModelUsed("Gemini");
        log.setTriggeredBy("USER");
        log.setSuccess(success);

        aiLogRepository.save(log);
    }
}