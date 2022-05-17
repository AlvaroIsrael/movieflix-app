import {
  ObjectID,
  ObjectIdColumn,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('movies')
class Movie {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  tmdbId: number;

  @Column({ nullable: true, })
  backdropPath: string;

  @Column()
  genre: string;

  @Column()
  director: string;

  @Column()
  title: string;

  @Column()
  overview: string;

  @Column({ nullable: true, })
  posterPath: string;

  @Column()
  year: string;

  @Column()
  voteAverage: number;

  @Column()
  voteCount: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Movie;
