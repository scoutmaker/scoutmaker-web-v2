import { Radar } from 'react-chartjs-2'

import { yellow, yellowTransparent } from '@/styles/colors'

import { ReportDto } from '../types'

interface IProps {
  skills: ReportDto['skills']
  width?: number
  height?: number
  maxRatingScore: number
  displayShortName?: boolean
}

export const SkillsChart = ({
  skills,
  width,
  height,
  maxRatingScore,
  displayShortName,
}: IProps) => {
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    legend: { display: false },
    scale: {
      ticks: { beginAtZero: true, min: 0, max: maxRatingScore, stepSize: 1 },
    },
    max: 1,
    stepSize: 1,
    animation: {
      duration: 0,
    },
  }

  const data = {
    labels: skills.map(skill =>
      displayShortName
        ? skill.template.shortName.toUpperCase()
        : skill.template.name.toUpperCase(),
    ),
    datasets: [
      {
        data: skills.map(skill => skill.rating),
        backgroundColor: yellowTransparent,
        borderColor: yellow,
        borderWidth: 1,
      },
    ],
  }

  return <Radar data={data} options={options} width={width} height={height} />
}
