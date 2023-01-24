import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { Play } from 'phosphor-react'

import {
  HomeContainer,
  FormContainer,
  TaskInput,
  MinutesAmountInput,
  CountdownContainer,
  Separator,
  StartCountDownButton,
} from './styles'

interface INewCycleFormData {
  task: string
  minutesAmount: number
}

const createNewCycleValidationSchema = zod.object({
  task: zod.string().trim().min(1, 'Informe uma tarefa.'),
  minutesAmount: zod.number().min(5).max(60),
})

export function Home() {
  // Uncontrolled Form
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<INewCycleFormData>({
    resolver: zodResolver(createNewCycleValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  function handleCreateNewCycle(data: INewCycleFormData) {
    console.log(data.minutesAmount)
  }

  console.log(errors.minutesAmount?.message)

  const task = watch('task')
  const isSubmitDisabled = !task

  /* 
    Controlled Form
    
    const [task, setTask] = useState('')

  function handleSubmit(event: FormEvent) {
    event.preventDefault()

    const target = event.target as typeof event.target & {
      task: {
        value: string
      }
    }

    console.log(target.task.value)
  } */

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            list="tasks-suggestions"
            type="text"
            placeholder="Dê um nome para o seu projeto"
            {...register('task')}
          />

          <datalist id="tasks-suggestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
            <option value="Zapzap" />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
            id="minutesAmount"
            type="number"
            placeholder="00"
            step={5}
            min={5}
            // max={60}
            {...register('minutesAmount', { valueAsNumber: true })}
          />
          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>

          <Separator>:</Separator>

          <span>0</span>
          <span>0</span>
        </CountdownContainer>
        <StartCountDownButton type="submit" disabled={isSubmitDisabled}>
          <Play size={24} /> Começar
        </StartCountDownButton>
      </form>
    </HomeContainer>
  )
}
