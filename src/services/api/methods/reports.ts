import {
  CreateReportDto,
  FindAllReportsParams,
  ReportBasicDataDto,
  ReportDto,
  ReportPaginatedDataDto,
  UpdateReportDto,
} from '@/modules/reports/types'
import { TModuleName } from '@/services/api/modules'

import {
  createDocument,
  deleteDocument,
  getAssetById,
  getDataList,
  getPaginatedData,
  likeDocument,
  unlikeDocument,
  updateDocument,
} from './helpers'

const moduleName: TModuleName = 'reports'

export const getReportById = (id: number, token?: string) =>
  getAssetById<ReportDto>({ moduleName, id, token })

export const getReportsList = () => getDataList<ReportBasicDataDto>(moduleName)

export const getReports = (params: FindAllReportsParams) =>
  getPaginatedData<FindAllReportsParams, ReportPaginatedDataDto>(
    params,
    moduleName,
  )

export const createReport = (data: CreateReportDto) =>
  createDocument<CreateReportDto, ReportDto>(data, moduleName)

interface IUpdateReportArgs {
  id: number
  data: UpdateReportDto
}

export const updateReport = ({ id, data }: IUpdateReportArgs) =>
  updateDocument<UpdateReportDto, ReportDto>(id, data, moduleName)

export const deleteReport = (id: number) =>
  deleteDocument<ReportDto>(id, moduleName)

export const likeReport = (id: number) =>
  likeDocument<ReportDto>(id, moduleName)

export const unlikeReport = (id: number) =>
  unlikeDocument<ReportDto>(id, moduleName)
