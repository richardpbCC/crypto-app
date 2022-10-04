import React from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";

import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";

const { Text, Title } = Typography;
const { Option } = Select;
const defaultImageUrl = "";

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
          <Card className="news-card" hoverable>
            <a href={article.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>
                  {article.name}
                </Title>
                <img
                  style={{maxWidth: "200px", maxHeight: "100px"}}
                  src={article?.image?.thumbnail?.contentUrl || defaultImageUrl}
                  alt="news thumbnail image"
                />
              </div>
              <p>
                {article.description > 100
                  ? `${article.description.substring(0, 100)}... `
                  : article.description}
              </p>
              <div className="provider-container">
                <div>
                  <Avatar
                    src={
                      article.provider[0]?.image?.thumbnail?.contentUrl ||
                      defaultImageUrl
                    }
                    alt="news provider image"
                  />
                  <Text classname="provider-name">{article.provider[0]?.name}</Text>
                </div>
                <Text>
                  {moment(article.datePublished).startOf("ss").fromNow()}
                </Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
