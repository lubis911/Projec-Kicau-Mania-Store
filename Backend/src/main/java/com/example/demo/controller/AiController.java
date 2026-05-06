package com.example.demo.controller;

import com.example.demo.service.AIService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
@CrossOrigin("*")
public class AiController {

    private final AIService aiService;

    @PostMapping("/chat")
    public Map<String, String> chat(
            @RequestBody Map<String, String> req
    ) {

        String question = req.get("question");

        if (question == null || question.trim().isEmpty()) {
            return Map.of(
                "answer",
                "Silakan tulis pertanyaan terlebih dahulu."
            );
        }

        String answer =
            aiService.askGemini(question.trim());

        return Map.of("answer", answer);
    }
}