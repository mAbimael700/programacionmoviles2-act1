import { Link } from 'expo-router';
import * as React from 'react';
import { View } from 'react-native';
import { buttonTextVariants, buttonVariants } from '~/components/ui/button';
import { cn } from '~/lib/utils';


const actividades = Array.from({ length: 19 })

export default function Screen() {

  return (
    <View className='grid grid-cols-2 lg:grid-cols-4 justify-center items-center gap-5 p-6 bg-secondary/30'>
      {
        actividades.map((a, i) =>
          <Link key={i} href={`/ejercicio${i + 1}`} className={cn(buttonVariants(), buttonTextVariants(), "even:bg-blue-600")}>Ir a actividad {i + 1}</Link>)
      }

    </View>
  );
}
