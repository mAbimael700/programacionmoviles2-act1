import React from 'react';
import { View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Input } from '~/components/ui/input';
import { Text } from '~/components/ui/text';
import { getArea, getPerimeter } from '~/lib/actividad2/functions';

export default function Actividad2() {
    const [radius, setRadius] = React.useState<string | undefined>()
    const [result, setResult] = React.useState<any>({
        error: undefined,
        perimeter: undefined,
        area: undefined
    })

    const opacity = useSharedValue(0); // Valor inicial para la opacidad

    const onChangeText = (text: string) => {

        if (text) {
            opacity.value = withTiming(1, {
                duration: 300,
                easing: Easing.out(Easing.ease),
            });
        } else {
            opacity.value = withTiming(0, {
                duration: 300,
                easing: Easing.in(Easing.ease),
            });
        }

        setRadius(text);
    };

    // Estilo animado
    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
            transform: [{ scale: opacity.value }], // Opcional: animación de escala
        };
    });


    const onHandleResult = () => {
        if (radius) {

            const value = Number.parseFloat(radius)

            if (Number.isNaN(value)) {
                return setResult({ error: 'El valor pasado no es un número' })
            }

            if (!(value > 0)) {
                return setResult({ error: 'El valor pasado debe ser positivo o mayo a cero' })
            }

            const perimeter = getPerimeter(value)
            const area = getArea(value)

            setResult({
                perimeter,
                area,
                error: undefined,
            })
        }
    }

    React.useEffect(() => {
        onHandleResult()
    }, [radius])

    return (
        <View className='flex-1 justify-center items-center gap-5 p-6 bg-secondary/30'>
            <View>
                <Text>Cree un programa que solicite el radio de un circulo y entregue como salida el perímetro y el área.</Text>
            </View>



            <Input
                placeholder='Ingrese el radio del circulo...'
                value={radius}
                onChangeText={onChangeText}
                aria-labelledby='inputLabel'
                aria-errormessage='inputError'
            />



            <View className='h-8'>
                <Animated.View style={[animatedStyle]}>
                    {result.error && <Text className='text-sm text-red-500'>{result.error}</Text>}
                    {
                        !result.error &&
                        <>
                            <Text className='text-3xl font-semibold'>Resultados del círculo con radio: {radius}</Text>
                            <Text>Area: {result.area}</Text>
                            <Text>Perímetro: {result.perimeter}</Text>
                        </>
                    }
                </Animated.View>
            </View>
        </View>
    )
}