import {
  CompetitionAgeCategortyDto,
  CreateCompetitionAgeCategoryDto,
  FindAllCompetitionAgeCategoriesParams,
  UpdateCompetitionAgeCategoryDto,
} from '@/modules/competition-age-categories/types'

import { TModuleName } from '../modules'
import {
  createDocument,
  deleteDocument,
  getAssetById,
  getDataList,
  getPaginatedData,
  updateDocument,
} from './helpers'

const moduleName: TModuleName = 'competition-age-categories'

export const getCompetitionAgeCategories = (
  params: FindAllCompetitionAgeCategoriesParams,
) =>
  getPaginatedData<
    FindAllCompetitionAgeCategoriesParams,
    CompetitionAgeCategortyDto
  >(params, moduleName)

export const deleteCompetitionAgeCategory = (id: string) =>
  deleteDocument<CompetitionAgeCategortyDto>(id, moduleName)

export const createCompetitionAgeCategory = (
  data: CreateCompetitionAgeCategoryDto,
) =>
  createDocument<CreateCompetitionAgeCategoryDto, CompetitionAgeCategortyDto>(
    data,
    moduleName,
  )

export const getCompetitionAgeCategoryById = (id: string, token?: string) =>
  getAssetById<CompetitionAgeCategortyDto>({ moduleName, id, token })

interface IUpdateArgs {
  id: string
  data: UpdateCompetitionAgeCategoryDto
}
export const updateCompetitionAgeCategory = ({ id, data }: IUpdateArgs) =>
  updateDocument<UpdateCompetitionAgeCategoryDto, CompetitionAgeCategortyDto>(
    id,
    data,
    moduleName,
  )

export const getCompetitionAgeCategoriesList = () =>
  getDataList<CompetitionAgeCategortyDto>(moduleName)
