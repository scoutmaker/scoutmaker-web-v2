import { SyntheticEvent, useState } from 'react'

export const useTabs = () => {
  const [activeTab, setActiveTab] = useState(0)

  function handleTabChange(
    event: SyntheticEvent<Element, Event>,
    newTab: number,
  ) {
    setActiveTab(newTab)
  }

  return { activeTab, handleTabChange, setActiveTab }
}
