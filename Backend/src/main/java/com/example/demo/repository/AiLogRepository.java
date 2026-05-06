package com.example.demo.repository;

import com.example.demo.entity.AiLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AiLogRepository
        extends JpaRepository<AiLog, Long> {
}