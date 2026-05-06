package com.example.demo.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "ai_logs")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AiLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ticket_id")
    private Ticket ticket;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ticket_message_id")
    private TicketMessage ticketMessage;

    @Column(name = "prompt_sent", columnDefinition = "TEXT")
    private String promptSent;

    @Column(name = "response_received", columnDefinition = "TEXT")
    private String responseReceived;

    @Column(name = "context_data", columnDefinition = "TEXT")
    private String contextData; // JSON dari FAQ / product

    @Column(name = "model_used")
    private String modelUsed;

    @Column(name = "triggered_by")
    private String triggeredBy; // USER / SYSTEM / AGENT

    @Column(name = "success")
    private Boolean success;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }
}