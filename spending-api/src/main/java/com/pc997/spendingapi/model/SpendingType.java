package com.pc997.spendingapi.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "spendingtypes", uniqueConstraints = {
        @UniqueConstraint(columnNames = "type")
})
public class SpendingType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    public SpendingType(String type) {this.type = type;}
}
