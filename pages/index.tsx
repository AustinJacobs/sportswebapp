import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { title, subtitle } from '@/components/primitives';
import DefaultLayout from '@/layouts/default';
import { Card, Skeleton, Button } from '@nextui-org/react';
import Image from 'next/image';

export default function IndexPage() {
  const [isLoaded, setIsLoaded] = React.useState(false);

  const toggleLoad = () => {
    setIsLoaded(!isLoaded);
  };

  const apiKey = process.env.NEXT_PUBLIC_RAPID_API_KEY;
  const options = {
    method: 'GET',
    url: 'https://api-basketball.p.rapidapi.com/teams',
    params: {
      league: '12',
      season: '2022-2023',
    },
    headers: {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': 'api-basketball.p.rapidapi.com',
    },
  };

  const [teams, setTeams] = useState<
    { id: number; name: string; logo: string }[]
  >([]); // Define teams state with type

  const fetchData = async () => {
    try {
      const response = await axios(options);
      console.log(response.data.response);
      setTeams(response.data.response);
      setIsLoaded(true); // Set isLoaded to true after data is fetched
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData(); // Automatically fetch data when the component mounts
  }, []);

  return (
    <DefaultLayout>
      <section className='items-center justify-center gap-4 py-8 md:py-10'>
        <div className='inline-block max-w-5xl text-left justify-left'>
          <h1 className={title()}>Make&nbsp;</h1>
          <h1 className={title({ color: 'violet' })}>beautiful&nbsp;</h1>
          <br />
          <h1 className={title()}>
            websites regardless of your design experience.
          </h1>
          <h4 className={subtitle({ class: 'mt-4' })}>
            Beautiful, fast and modern React UI library.
          </h4>
        </div>
      </section>
      <section className='items-center justify-center gap-4 py-8 md:py-10'>
        <div className='flex flex-col gap-3 max-w-sm'>
          {isLoaded ? (
            teams.length > 0 ? (
              teams.map((team) => (
                <Card
                  key={team.id}
                  className='w-[200px] space-y-5 p-4'
                  radius='lg'>
                  <h3>{team.name}</h3>
                  <Image
                    width='0'
                    height='0'
                    sizes='100vw'
                    className='w-full h-auto'
                    src={team.logo}
                    alt=''
                  />
                </Card>
              ))
            ) : (
              <p>No teams found.</p>
            )
          ) : (
            <Skeleton isLoaded={isLoaded} className='rounded-lg'>
              <div className='h-24 rounded-lg bg-secondary'></div>
            </Skeleton>
          )}
          {/* <Button
            size='sm'
            variant='flat'
            color='secondary'
            onPress={() => setIsLoaded(!isLoaded)}>
            {isLoaded ? 'Hide' : 'Show'} Teams
          </Button> */}
        </div>
      </section>
    </DefaultLayout>
  );
}
