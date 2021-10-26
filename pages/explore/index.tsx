import React from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

//styles
import $ from './explore.module.scss';

//types
import { Song } from 'types/song';

const Explore = ({ songs }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <div className={$.root}>
            {songs && songs.map(song => {
                return (<div className={$.songWrapper}>
                    <h3 className={$.songTitle}>{song.name}</h3>
                    <p className={$.artistName}>{song.artist_name}</p>
                    <p className={$.typeTag}>{song.tab_type}</p>
                </div>)
            })}
        </div>
    )
}

export const getServerSideProps: GetServerSideProps<{ songs: Song[]}> = async () => {

    const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + '/song')

    const { data } = await res.json();

    

    return {
        props: {
            songs: data || []
        }
    }

}

export default Explore
