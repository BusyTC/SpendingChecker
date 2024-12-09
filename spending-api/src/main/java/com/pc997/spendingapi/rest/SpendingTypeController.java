package com.pc997.spendingapi.rest;


import com.pc997.spendingapi.mapper.SpendingTypeMapper;
import com.pc997.spendingapi.model.SpendingType;
import com.pc997.spendingapi.model.User;
import com.pc997.spendingapi.rest.dto.CreateSpendingTypeRequest;
import com.pc997.spendingapi.rest.dto.SpendingTypeDto;
import com.pc997.spendingapi.security.CustomUserDetails;
import com.pc997.spendingapi.service.SpendingTypeService;
import com.pc997.spendingapi.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

import static com.pc997.spendingapi.config.SwaggerConfig.BEARER_KEY_SECURITY_SCHEME;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/spendingTypes")
public class SpendingTypeController {

    private final UserService userService;
    private final SpendingTypeService spendingTypeService;
    private final SpendingTypeMapper spendingTypeMapper;

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping
    public List<SpendingTypeDto> getSpendingTypes() {
       return spendingTypeService.getSpendingTypes().stream()
               .map(spendingTypeMapper::toSpendingTypeDto)
               .collect(Collectors.toList());
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public SpendingTypeDto createSpendingType(@AuthenticationPrincipal CustomUserDetails currentUser,
                                              @Valid @RequestBody CreateSpendingTypeRequest createSpendingTypeRequest) {
        User user = userService.validateAndGetUserByUsername(currentUser.getUsername());
        SpendingType spendingType = spendingTypeMapper.toSpendingType(createSpendingTypeRequest);
        spendingType.setUser(user);
        return spendingTypeMapper.toSpendingTypeDto(spendingTypeService.saveSpendingType(spendingType));
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @DeleteMapping("/{id}")
    public SpendingTypeDto deleteSpendingTypes(@PathVariable Long id) {
        SpendingType spendingType = spendingTypeService.validateAndGetSpendingType(id);
        spendingTypeService.deleteSpendingType(spendingType);
        return spendingTypeMapper.toSpendingTypeDto(spendingType);
    }
}
