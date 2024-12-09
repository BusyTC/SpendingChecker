package com.pc997.spendingapi.rest.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateSpendingRequest {

    @Schema(example = "Buy two iPhones")
    @NotBlank
    private String description;

    @Schema(example = "Buy two iPhones")
    @NotBlank
    private String otype;

    @Schema(example = "12000")
    private Long price;
}
