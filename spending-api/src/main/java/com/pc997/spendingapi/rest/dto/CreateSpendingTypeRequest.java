package com.pc997.spendingapi.rest.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateSpendingTypeRequest {

    @Schema(example = "Food")
    @NotBlank
    private String type;
}
