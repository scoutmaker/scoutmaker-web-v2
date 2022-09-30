import { Grid, styled, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { LayoutContentWrapper } from '@/components/landing/LayoutContentWrapper'

import { Testimonial } from './data'
import { TestimonialCard } from './TestimonialCard'

type Props = { testimonials: Testimonial[] }

export const TestimonialsSection = ({ testimonials }: Props) => {
  const { t } = useTranslation()

  return (
    <section>
      <LayoutContentWrapper>
        <Heading variant="h2">{t('landing-app:TRUSTED_US')}</Heading>
        <Container container spacing={3}>
          {testimonials.map(testimonial => (
            <Grid
              item
              key={testimonial.name}
              xl={4}
              lg={4}
              md={12}
              sm={12}
              xs={12}
            >
              <TestimonialCard
                title={testimonial.name}
                subtitle={testimonial.role}
                text={testimonial.text}
              />
            </Grid>
          ))}
        </Container>
      </LayoutContentWrapper>
    </section>
  )
}

const Heading = styled(Typography)(({ theme }) => ({
  fontSize: 48,
  padding: theme.spacing(3, 0),

  [theme.breakpoints.down('lg')]: {
    fontSize: 36,
    textAlign: 'center',
  },
}))

const Container = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(3),
  justifyContent: 'space-between',
}))
