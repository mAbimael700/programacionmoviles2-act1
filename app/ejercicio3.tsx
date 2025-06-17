import React from "react"
import { View } from "react-native"
import EjercicioTemplateMultiple, { InputConfig } from "~/components/activity/EjercicioMultipleTemplate"
import { Text } from "~/components/ui/text"

export default function EjercicioPromedioCalificaciones() {
    const [calificacion1, setCalificacion1] = React.useState<string>('')
    const [calificacion2, setCalificacion2] = React.useState<string>('')
    const [calificacion3, setCalificacion3] = React.useState<string>('')
    const [calificacion4, setCalificacion4] = React.useState<string>('')
    const [promedio, setPromedio] = React.useState<number | null>(null)

    const inputs: InputConfig[] = [
        {
            key: 'calificacion1',
            placeholder: '85',
            label: 'Primera calificación:',
            value: calificacion1,
            set: setCalificacion1
        },
        {
            key: 'calificacion2',
            placeholder: '92',
            label: 'Segunda calificación:',
            value: calificacion2,
            set: setCalificacion2
        },
        {
            key: 'calificacion3',
            placeholder: '78',
            label: 'Tercera calificación:',
            value: calificacion3,
            set: setCalificacion3
        },
        {
            key: 'calificacion4',
            placeholder: '88',
            label: 'Cuarta calificación:',
            value: calificacion4,
            set: setCalificacion4
        }
    ]

    const calcularPromedio = () => {
        if (calificacion1 && calificacion2 && calificacion3 && calificacion4) {
            const cal1 = parseFloat(calificacion1)
            const cal2 = parseFloat(calificacion2)
            const cal3 = parseFloat(calificacion3)
            const cal4 = parseFloat(calificacion4)
            
            if (!isNaN(cal1) && !isNaN(cal2) && !isNaN(cal3) && !isNaN(cal4) &&
                cal1 >= 0 && cal1 <= 100 && cal2 >= 0 && cal2 <= 100 && 
                cal3 >= 0 && cal3 <= 100 && cal4 >= 0 && cal4 <= 100) {
                
                const promedioCalculado = (cal1 + cal2 + cal3 + cal4) / 4
                setPromedio(promedioCalculado)
            } else {
                setPromedio(null)
            }
        }
    }

    React.useEffect(() => {
        calcularPromedio()
    }, [calificacion1, calificacion2, calificacion3, calificacion4])

    return (
        <EjercicioTemplateMultiple
            description="Cree un programa que permita calcular el promedio de cuatro calificaciones ingresadas por el usuario."
            inputs={inputs}
        >
            <View className=' gap-2'>
                {promedio !== null ? (
                    <>
                        <Text className='text-center font-semibold text-lg mb-2'>Resultado:</Text>
                        <Text className='text-center'>Calificación 1: {calificacion1}</Text>
                        <Text className='text-center'>Calificación 2: {calificacion2}</Text>
                        <Text className='text-center'>Calificación 3: {calificacion3}</Text>
                        <Text className='text-center'>Calificación 4: {calificacion4}</Text>
                        <View className='mt-2 pt-2 border-t border-border'>
                            <Text className='text-center text-lg font-bold'>
                                El promedio es: {promedio.toFixed(2)}
                            </Text>
                        </View>
                    </>
                ) : (
                    <Text className='text-center text-lg font-semibold'>
                        Ingrese cuatro calificaciones válidas (0-100)
                    </Text>
                )}
            </View>
        </EjercicioTemplateMultiple>
    )
}