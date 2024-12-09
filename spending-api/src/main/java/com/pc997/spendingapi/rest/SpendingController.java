package com.pc997.spendingapi.rest;

import com.pc997.spendingapi.mapper.SpendingMapper;
import com.pc997.spendingapi.model.Spending;
import com.pc997.spendingapi.model.User;
import com.pc997.spendingapi.rest.dto.CreateSpendingRequest;
import com.pc997.spendingapi.rest.dto.SpendingDto;
import com.pc997.spendingapi.security.CustomUserDetails;
import com.pc997.spendingapi.service.SpendingService;
import com.pc997.spendingapi.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import static com.pc997.spendingapi.config.SwaggerConfig.BEARER_KEY_SECURITY_SCHEME;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/spendings")
public class SpendingController {

    private final UserService userService;
    private final SpendingService spendingService;
    private final SpendingMapper spendingMapper;

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping
    public List<SpendingDto> getSpendings(@RequestParam(value = "text", required = false) String text) {
        List<Spending> spendings = (text == null) ? spendingService.getSpendings() : spendingService.getSpendingsContainingText(text);
        return spendings.stream()
                .map(spendingMapper::toSpendingDto)
                .collect(Collectors.toList());
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public SpendingDto createSpending(@AuthenticationPrincipal CustomUserDetails currentUser,
                                @Valid @RequestBody CreateSpendingRequest createSpendingRequest) {
        User user = userService.validateAndGetUserByUsername(currentUser.getUsername());
        Spending spending = spendingMapper.toSpending(createSpendingRequest);
        spending.setId(UUID.randomUUID().toString());
        spending.setUser(user);
        return spendingMapper.toSpendingDto(spendingService.saveSpending(spending));
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @DeleteMapping("/{id}")
    public SpendingDto deleteSpendings(@PathVariable UUID id) {
        Spending spending = spendingService.validateAndGetSpending(id.toString());
        spendingService.deleteSpending(spending);
        return spendingMapper.toSpendingDto(spending);
    }
}
