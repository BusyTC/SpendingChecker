package com.pc997.spendingapi.mapper;

import com.pc997.spendingapi.model.Spending;
import com.pc997.spendingapi.rest.dto.CreateSpendingRequest;
import com.pc997.spendingapi.rest.dto.SpendingDto;
import org.springframework.stereotype.Service;

@Service
public class SpendingMapperImpl implements SpendingMapper {

    @Override
    public Spending toSpending(CreateSpendingRequest createSpendingRequest) {
        if (createSpendingRequest == null) {
            return null;
        }
        return new Spending(createSpendingRequest.getDescription(), createSpendingRequest.getOtype(), createSpendingRequest.getPrice());
    }

    @Override
    public SpendingDto toSpendingDto(Spending spending) {
        if (spending == null) {
            return null;
        }
        SpendingDto.UserDto userDto = new SpendingDto.UserDto(spending.getUser().getUsername());
        return new SpendingDto(spending.getId(), spending.getDescription(), spending.getOtype(), spending.getPrice(), userDto, spending.getCreatedAt());
    }
}
