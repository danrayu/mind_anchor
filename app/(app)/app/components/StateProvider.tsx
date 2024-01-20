'use client';
import store from '@/app/store/store'
import { Provider } from 'react-redux'
interface StateProviderProps {
  children: React.ReactNode;
}
function StateProvider({children}: StateProviderProps) {
  console.log("reset state");
  return (
    <Provider store={store}>{children}</Provider>
  )
}

export default StateProvider