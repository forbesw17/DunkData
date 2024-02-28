import axios from "axios";

export const getLastestNews = async () => {
  try {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${
        (currentDate.getMonth() + 1).toString().padStart(2, '0')
      }-${currentDate.getDate().toString().padStart(2, '0')}`;

    const url = `https://api.goperigon.com/v1/all?apiKey=${process.env.EXPO_PUBLIC_PERIGON_KEY}&from=${formattedDate}&showNumResults=true&showReprints=false&paywall=false&excludeLabel=Non-news&excludeLabel=Opinion&excludeLabel=Paid News&excludeLabel=Roundup&excludeLabel=Press Release&sortBy=relevance&source=nba.com&title=NOT photos NOT gallery NOT pics&medium=Article`;

    const response = await axios.get(url);
    const articles = response.data.articles.map((article: any) => ({
      title: article.title,
      description: article.description,
      imageURL: article.imageUrl,
      link: article.url,
    }));
    return articles;
  } catch (error) {
    console.error(error);
    return []; // or handle error in a different way as per your requirement
  }
};
