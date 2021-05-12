import React, { useEffect, useState } from "react";
import { Article } from "../models/article";
import { queryDetail } from "../api";
import { RouteComponentProps } from "react-router";
import { Typography, Image } from "antd";
import RecentArticle from "./RecentArticle";

const { Title, Paragraph } = Typography;

type Param = {
  id: string;
};

const ArticleDetail = ({ match }: RouteComponentProps<Param>) => {
  const [article, setArticle] = useState<Article>();

  const { id } = match.params;

  // 我们将给 useEffect 传第二个空数组的参数，来实现这个效果：只在组件mount的时候，调用 useEffect 函数。
  useEffect(() => {
    const fetchDetail = async () => {
      const result = await queryDetail(id);
      setArticle(result.data.data);
    };
    fetchDetail();
  }, [id]);

  return (
    <div>
      <div style={{ float: "right" }}>
        <RecentArticle />
      </div>
      <Typography>
        <Title level={2}>{article?.title}</Title>
        <Image width={360} src={article?.pic} />
        <Paragraph>{article?.content}</Paragraph>
      </Typography>
    </div>
  );
};

export default ArticleDetail;
