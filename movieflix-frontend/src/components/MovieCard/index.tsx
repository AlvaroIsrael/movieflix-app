import React, { FC, HTMLAttributes, useCallback } from 'react';
import { Card, Cover, Title, ReleaseDate } from './styles';

type MovieCardProps = HTMLAttributes<HTMLDivElement> & {
  coverUrl: string;
  title: string;
  releaseDate: string;
};

const MovieCard: FC<MovieCardProps> = ({ coverUrl, title, releaseDate, ...rest }: MovieCardProps) => {
  const handleCardClick = useCallback(() => {
    // eslint-disable-next-line no-console
    console.log('clicked');
  }, []);

  return (
    <Card {...rest} onClick={handleCardClick}>
      <Cover src={coverUrl} />
      <Title>{title}</Title>
      <ReleaseDate>{releaseDate}</ReleaseDate>
    </Card>
  );
};

export default MovieCard;
