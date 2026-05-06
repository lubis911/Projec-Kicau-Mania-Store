package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.TicketMessage;

public interface TicketMessageRepository extends JpaRepository<TicketMessage, Long> {
}