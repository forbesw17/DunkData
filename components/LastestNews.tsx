import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Linking,
  Image,
  Pressable,
} from "react-native";

import Colors from "@/constants/Colors";

import { getLastestNews } from "@/server/PerigonAPI"; // Assuming PerigonAPI is the correct one to import
import { defaultStyles } from "@/constants/Styles";

const LatestNews = () => {
  // const [news, setNews] = useState<{ articles: any[]; } | undefined >();
  const news = [
    {
      description:
        "The Orlando Magic rolled past the Brooklyn Nets 108-81 on Tuesday night at Kia Center.",
      imageURL:
        "https://cdn.nba.com/teams/uploads/sites/1610612753/2024/02/moewagnernets_2400_202234325.jpg",
      link: "https://www.nba.com/magic/news/another-stifling-defensive-effort-leads-to-another-orlando-magic-victory-this-time-over-the-brooklyn-nets-20240227",
      title:
        "Another Stifling Defensive Effort Leads to Another Orlando Magic Victory, This Time Over the Brooklyn Nets",
    },
    {
      description:
        "The Los Angeles Lakers hosted an art exhibition as a part of the Lakers In the Paint program, presented by DWS, featuring 40 works of art across a broad range of media and materials from 14 Los Angeles-area artists of color.",
      imageURL:
        "https://cdn.nba.com/teams/uploads/sites/1610612747/2024/02/in-the-paint-exhibition24-entry-1130x635-0V2A1386.jpg",
      link: "https://www.nba.com/lakers/news/lakers-host-bipoc-art-exhibition-at-training-facility-022724",
      title: "Lakers Host BIPOC Art Exhibition at Training Facility",
    },
    {
      description:
        "Cavaliers swingman Max Strus pulls game-winner from 58 feet away to steal victory at the buzzer vs. Mavericks.",
      imageURL: "https://cdn.nba.com/manage/2024/02/strus-emotion022724.jpg",
      link: "https://www.nba.com/news/horry-scale-max-strus-sinks-game-winner-from-midcourt-feb-27",
      title: "Horry Scale: Max Strus' game-winner sinks the Mavs from midcourt",
    },
    {
      description: "Edwards scores 34 as Wolves beat Spurs 114-105",
      imageURL:
        "https://cdn.nba.com/teams/uploads/sites/1610612750/2024/02/GettyImages-2036338041.jpg",
      link: "https://www.nba.com/timberwolves/news/edwards-scores-34-as-wolves-beat-spurs-114-105-without-towns",
      title: "Edwards scores 34 as Wolves beat Spurs 114-105",
    },
    {
      description:
        "Even with their recently reshuffled roster, the Charlotte Hornets still couldn’t come anywhere close to matching up with the Milwaukee Bucks on Tuesday night, their latest loss being a 123-85 drubbing at the Fiserv Forum.",
      imageURL:
        "https://cdn.nba.com/teams/uploads/sites/1610612766/2024/02/CHA-VS-MIL-ARTICLE-022724.jpg",
      link: "https://www.nba.com/hornets/news/hornets-finish-road-trip-with-massive-thud-in-milwaukee",
      title: "Hornets Finish Road Trip With Massive Thud In Milwaukee",
    },
    {
      description: "Homestand Ends With Another Injury, Loss To Heat",
      imageURL:
        "https://cdn.nba.com/teams/uploads/sites/1610612757/2024/02/recap_FC_022724.jpg",
      link: "https://www.nba.com/blazers/news/homestand-ends-with-another-injury-loss-to-heat",
      title: "Homestand Ends With Another Injury, Loss To Heat",
    },
    {
      description: "Pride Night 2024",
      imageURL: "",
      link: "https://www.nba.com/pacers/pride-night",
      title: "Pride Night 2024",
    },
    {
      description: "Dinner + Ticket",
      imageURL: "",
      link: "https://www.nba.com/timberwolves/clubti-pregame-offer",
      title: "Dinner + Ticket",
    },
    {
      description:
        "JB Continues Trend of Hot Starts, Leads C's to 9th Straight Win Over Philly",
      imageURL:
        "https://cdn.nba.com/teams/uploads/sites/1610612738/2024/02/jbattackUntitled-4.jpg",
      link: "https://www.nba.com/celtics/news/sidebar-post-20240227-jb-continues-trend-of-hot-starts-leads-cs-to-9th-straight-win-over-philly",
      title:
        "JB Continues Trend of Hot Starts, Leads C's to 9th Straight Win Over Philly",
    },
    {
      description:
        "The Charlotte Hornets announced today that they will host a special Feastables Night during tomorrow’s Anniversary Night game against the Milwaukee Bucks.",
      imageURL:
        "https://cdn.nba.com/teams/uploads/sites/1610612766/2022/05/Generic-Header-2.png",
      link: "https://www.nba.com/hornets/news/charlotte-hornets-to-host-feastables-night-tomorrow",
      title: "Charlotte Hornets To Host Feastables Night Tomorrow",
    },
  ];

  // useEffect(() => {
  //   const fetchNews = async () => {
  //     try {
  //       const data = await getLastestNews();
  //       setNews(data || []);
  //       console.log(news);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchNews();
  // }, [news === undefined]);

  const openURL = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <View style={{ paddingHorizontal: 10 }}>
      {news?.map((article, index) => (
        <Pressable key={index} onPress={() => openURL(article.link)}>
          <View style={styles.articleContainer}>
            {article.imageURL && (
              <View>
                <Image
                  style={{
                    width: "100%",
                    height: 200,
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                  }}
                  source={{ uri: article.imageURL }}
                  resizeMode="cover"
                />
              </View>
            )}
            <View
              style={{ paddingHorizontal: 10, paddingVertical: 15 }}
            >
              <Text style={styles.articleTitle}>{article.title}</Text>
            </View>
          </View>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  articleContainer: {
    flexDirection: "column",
    backgroundColor: "white",
    borderRadius: 15,
    marginBottom: 10,
  },
  articleTitle: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LatestNews;
