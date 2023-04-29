import { Box } from '@mui/material'

import CountriesData from './countries-data.json'

interface IProps {
  code: string
}

export const FlagEmoji = ({ code }: IProps) => {
  let codeFinal = code.toUpperCase()

  if (code.length > 2) {
    codeFinal = CountriesData.find(e => e.alpha3 === codeFinal)?.alpha2 || code
  }

  return (
    <Box
      component="img"
      src={`https://flagcdn.com/${codeFinal.toLowerCase()}.svg`}
      // width={30}
      // height={15}
      sx={{ width: 18 }}
      loading="lazy"
    />
  )
}
