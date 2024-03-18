import React, { useState } from "react";
import { View } from "react-native";

import DateScrollBar from "./DateScrollBar";
import UpcomingGames from "@/components/UpcomingGames";

// Component retrieves the upcoming games from the SportRadar API and displays them in a list
const Schedule = () => {
  const [selectedDate, setSelectedDate] = useState(6); // Inital date index is today (6)

  const dates: Date[] = [];

  for (let i = -6; i <= 8; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    dates.push(date);
  }

  const upcomingGames = {
    date: "2024-03-18",
    games: [
      {
        away: "Cleveland Cavaliers",
        awayID: "583ec773-fb46-11e1-82cb-f4ce4684ea4c",
        awayScore: undefined,
        home: "Indiana Pacers",
        homeID: "583ec7cd-fb46-11e1-82cb-f4ce4684ea4c",
        homeScore: undefined,
        id: "93e11913-58a3-4fae-9013-43c1561a5d21",
        scheduledTime: "7:00 PM",
        status: "scheduled",
      },
      {
        away: "Miami Heat",
        awayID: "583ecea6-fb46-11e1-82cb-f4ce4684ea4c",
        awayScore: undefined,
        home: "Philadelphia 76ers",
        homeID: "583ec87d-fb46-11e1-82cb-f4ce4684ea4c",
        homeScore: undefined,
        id: "27fa5951-b6d6-430a-9a07-b4cbef5587dd",
        scheduledTime: "7:30 PM",
        status: "scheduled",
      },
      {
        away: "Detroit Pistons",
        awayID: "583ec928-fb46-11e1-82cb-f4ce4684ea4c",
        awayScore: undefined,
        home: "Boston Celtics",
        homeID: "583eccfa-fb46-11e1-82cb-f4ce4684ea4c",
        homeScore: undefined,
        id: "79bd87b1-c57b-42b3-9d58-683d64aadcae",
        scheduledTime: "7:30 PM",
        status: "scheduled",
      },
      {
        away: "Portland Trail Blazers",
        awayID: "583ed056-fb46-11e1-82cb-f4ce4684ea4c",
        awayScore: undefined,
        home: "Chicago Bulls",
        homeID: "583ec5fd-fb46-11e1-82cb-f4ce4684ea4c",
        homeScore: undefined,
        id: "aff71d57-0fcd-456a-a4ca-3f321371e2cf",
        scheduledTime: "8:00 PM",
        status: "scheduled",
      },
      {
        away: "Minnesota Timberwolves",
        awayID: "583eca2f-fb46-11e1-82cb-f4ce4684ea4c",
        awayScore: undefined,
        home: "Utah Jazz",
        homeID: "583ece50-fb46-11e1-82cb-f4ce4684ea4c",
        homeScore: undefined,
        id: "796a7d8f-3cbf-42fc-8af6-6cc2bd2f7746",
        scheduledTime: "9:00 PM",
        status: "scheduled",
      },
      {
        away: "Memphis Grizzlies",
        awayID: "583eca88-fb46-11e1-82cb-f4ce4684ea4c",
        awayScore: undefined,
        home: "Sacramento Kings",
        homeID: "583ed0ac-fb46-11e1-82cb-f4ce4684ea4c",
        homeScore: undefined,
        id: "9adfce69-aa88-40f3-8fd5-d5aca41ff7f7",
        scheduledTime: "10:00 PM",
        status: "scheduled",
      },
      {
        away: "New York Knicks",
        awayID: "583ec70e-fb46-11e1-82cb-f4ce4684ea4c",
        awayScore: undefined,
        home: "Golden State Warriors",
        homeID: "583ec825-fb46-11e1-82cb-f4ce4684ea4c",
        homeScore: undefined,
        id: "bd9f13c8-6cb8-459a-a87f-8b679fdc1142",
        scheduledTime: "10:00 PM",
        status: "scheduled",
      },
      {
        away: "Atlanta Hawks",
        awayID: "583ecb8f-fb46-11e1-82cb-f4ce4684ea4c",
        awayScore: undefined,
        home: "Los Angeles Lakers",
        homeID: "583ecae2-fb46-11e1-82cb-f4ce4684ea4c",
        homeScore: undefined,
        id: "f2ffd19c-544c-412f-b63b-4ccc617c7910",
        scheduledTime: "10:30 PM",
        status: "scheduled",
      },
    ],
  };

  return (
    <View>
      <DateScrollBar
        dates={dates}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <UpcomingGames currentDate={dates[selectedDate]} />
    </View>
  );
};

export default Schedule;
