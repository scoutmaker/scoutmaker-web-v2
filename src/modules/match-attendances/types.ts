export type MatchAttendanceDto = Components.Schemas.MatchAttendanceDto

export type AddMatchAttendanceDto = {
  matchId: string
  observationType: MatchAttendanceDto['observationType']
}
