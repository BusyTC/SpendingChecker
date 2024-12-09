package com.pc997.spendingapi.rest;

import com.pc997.spendingapi.service.SpendingService;
import com.pc997.spendingapi.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/public")
public class PublicController {

    private final UserService userService;
    private final SpendingService spendingService;

    @GetMapping("/numberOfUsers")
    public Integer getNumberOfUsers() {
        return userService.getUsers().size();
    }

    @GetMapping("/numberOfSpendings")
    public Integer getNumberOfSpendings() {
        return spendingService.getSpendings().size();
    }
}
