import React from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";

import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";

const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory: "Cryptocurrency",
    count: simplified ? 6 : 12,
  });

  if (!cryptoNews?.value) {
    return "Loading...";
  }

  return (
    <Row gutter={[24, 24]}>
      {cryptoNews.value.map((article, index) => (
        <Col xs={24} sm={12} lg={8} key={index}>
          <Card 
            className="news-card"
            hoverable
            >
              <a href={article.url} target ="_blank" rel="noreferrer">
                <div classname="news-image-container">
                  <Title className="news-title" level={4}>{article.name}</Title>
                </div>
              </a>
          </Card>
        </Col>
      ))}
    </Row>
  )
};

export default News;
