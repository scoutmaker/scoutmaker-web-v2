import {
  CreateReportBgImageDto,
  FindAllReportBgImagesParams,
  ReportBgImageDto,
  UpdateReportBgImageDto,
} from '@/modules/report-background-images/types'
import {
  createDocument,
  deleteDocument,
  getAssetById,
  getDataList,
  getPaginatedData,
  updateDocument,
} from '@/services/api/methods/helpers'
import { TModuleName } from '@/services/api/modules'

const moduleName: TModuleName = 'report-background-images'

export const getReportBgImagesList = () =>
  getDataList<ReportBgImageDto>(moduleName)

export const getReportBgImages = (params: FindAllReportBgImagesParams) =>
  getPaginatedData<FindAllReportBgImagesParams, ReportBgImageDto>(
    params,
    moduleName,
  )

export const deleteReportBgImage = (id: number) =>
  deleteDocument<ReportBgImageDto>(id, moduleName)

interface IUpdateArgs {
  id: number
  data: UpdateReportBgImageDto
}
export const updateReportBgImage = ({ id, data }: IUpdateArgs) =>
  updateDocument<UpdateReportBgImageDto, ReportBgImageDto>(id, data, moduleName)

export const createReportBgImage = (data: CreateReportBgImageDto) =>
  createDocument<CreateReportBgImageDto, ReportBgImageDto>(data, moduleName)

export const getReportBgImageById = (id: number, token?: string) =>
  getAssetById<ReportBgImageDto>({ moduleName, id, token })
