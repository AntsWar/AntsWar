package com.antswar.backend.room.application.dto;

public record SearchRoomResult(RoomInfo room, Occupancy occupancy) {
    public record Occupancy (int currentCount, int capacity){ }
}
