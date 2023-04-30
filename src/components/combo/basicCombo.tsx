import {
  autocompleteClasses,
  AutocompleteRenderInputParams,
  createFilterOptions,
  ListSubheader,
  Popper,
  styled,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { Field } from 'formik'
import { Autocomplete } from 'formik-mui'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { ListChildComponentProps, VariableSizeList } from 'react-window'

import { IComboOptions } from './types'

interface IBasicComboProps {
  data: IComboOptions[]
  name: string
  label: string
  multiple?: boolean
  size?: 'medium' | 'small'
  error?: boolean
  helperText?: string
  disabled?: boolean
  filterBeforeComma?: boolean
  onChange?: (event: any, value: any) => void
}

const LISTBOX_PADDING = 8 // px

function renderRow(props: ListChildComponentProps) {
  const { data, index, style } = props
  const dataSet = data[index]
  const inlineStyle = {
    ...style,
    top: (style.top as number) + LISTBOX_PADDING,
  }

  if (Object.prototype.hasOwnProperty.call(dataSet, 'group')) {
    return (
      <ListSubheader key={dataSet.key} component="div" style={inlineStyle}>
        {dataSet.group}
      </ListSubheader>
    )
  }

  const option: string = dataSet[1]
  const comboData: IComboOptions[] = dataSet[2]

  let optionLabel: string
  if (option === '') optionLabel = ''
  else optionLabel = comboData.find(el => el.id === option)?.label || 'None'

  return (
    <Typography
      component="li"
      {...dataSet[0]}
      key={option}
      noWrap
      style={inlineStyle}
    >
      {optionLabel}
    </Typography>
  )
}

const OuterElementContext = React.createContext({})

const OuterElementType = React.forwardRef<HTMLDivElement>((props, ref) => {
  const outerProps = React.useContext(OuterElementContext)
  return <div ref={ref} {...props} {...outerProps} />
})

function useResetCache(data: any) {
  const ref = React.useRef<VariableSizeList>(null)
  React.useEffect(() => {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true)
    }
  }, [data])
  return ref
}

// Adapter for react-window
const ListboxComponent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLElement>
>((props, ref) => {
  const { children, ...other } = props
  const itemData: React.ReactElement[] = []
  ;(children as React.ReactElement[]).forEach(
    (item: React.ReactElement & { children?: React.ReactElement[] }) => {
      itemData.push(item)
      itemData.push(...(item.children || []))
    },
  )

  const theme = useTheme()
  const smUp = useMediaQuery(theme.breakpoints.up('sm'), {
    noSsr: true,
  })
  const itemCount = itemData.length
  const itemSize = smUp ? 36 : 48

  const getChildSize = (child: React.ReactElement) => {
    if (Object.prototype.hasOwnProperty.call(child, 'group')) {
      return 48
    }

    return itemSize
  }

  const getHeight = () => {
    if (itemCount > 8) {
      return 8 * itemSize
    }
    return itemData.map(getChildSize).reduce((a, b) => a + b, 0)
  }

  const gridRef = useResetCache(itemCount)

  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          itemData={itemData}
          height={getHeight() + 2 * LISTBOX_PADDING}
          width="100%"
          ref={gridRef}
          outerElementType={OuterElementType}
          innerElementType="ul"
          itemSize={(index: number) => getChildSize(itemData[index])}
          overscanCount={5}
          itemCount={itemCount}
        >
          {renderRow}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  )
})

const StyledPopper = styled(Popper)({
  [`& .${autocompleteClasses.listbox}`]: {
    boxSizing: 'border-box',
    '& ul': {
      padding: 0,
      margin: 0,
    },
  },
})

export const BasicCombo = ({
  data,
  name,
  label,
  multiple,
  size,
  error,
  helperText,
  disabled,
  filterBeforeComma,
  onChange,
}: IBasicComboProps) => {
  const { t } = useTranslation()
  const filterOptions = createFilterOptions({
    stringify: (option: string) =>
      data.find(e => e.id === option)?.label.split(', ')[0] || '',
  })
  return (
    <Field
      name={name}
      component={Autocomplete}
      disableListWrap
      PopperComponent={StyledPopper}
      ListboxComponent={ListboxComponent}
      multiple={multiple}
      onChange={onChange}
      id={name}
      size={size}
      options={['', ...data.map(el => el.id)]}
      getOptionLabel={(option: string) => {
        if (option === '') return ''
        return data.find(el => el.id === option)?.label || t('NONE')
      }}
      filterSelectedOptions
      filterOptions={filterBeforeComma ? filterOptions : undefined}
      disabled={disabled}
      renderOption={(props: any, option: IComboOptions) =>
        [props, option, data] as React.ReactNode
      }
      renderInput={(params: AutocompleteRenderInputParams) => (
        <TextField
          {...params}
          error={error}
          helperText={helperText}
          label={label}
          placeholder={label}
        />
      )}
    />
  )
}
