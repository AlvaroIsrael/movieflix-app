import React, { FC, HTMLAttributes } from 'react';
import { Card, Cover, Title, ReleaseDate } from './styles';

type MovieCardProps = HTMLAttributes<HTMLDivElement> & {
  coverUrl: string;
  title: string;
  releaseDate: string;
};

const MovieCard: FC<MovieCardProps> = ({ coverUrl, title, releaseDate, ...rest }: MovieCardProps) => {
  return (
    <Card {...rest}>
      <Cover src={coverUrl} />
      <Title>{title}</Title>
      <ReleaseDate>{releaseDate}</ReleaseDate>
    </Card>
  );
};

export default MovieCard;
