import { Typography } from '@mui/material'

import { PlayerRoleDto } from './types'
import { groupPlayerRoleExamples } from './utils'

export const GroupedPlayerRoleExamples = ({
  examples,
}: {
  examples: PlayerRoleDto['examples']
}) => {
  const entries = Object.entries(groupPlayerRoleExamples(examples))

  if (!entries.length) return <Typography>-</Typography>
  return (
    <div>
      {entries.map(([key, value]) => (
        <Typography>
          <strong>{key}</strong>: {value.join(', ')}
        </Typography>
      ))}
    </div>
  )
}
