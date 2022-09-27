import {
  createReportBgImage,
  deleteReportBgImage,
  getReportBgImages,
  getReportBgImagesList,
  updateReportBgImage,
} from '@/services/api/methods/report-background-images'
import { TModuleName } from '@/services/api/modules'
import { useCreateDocument } from '@/utils/hooks/api/use-create-document'
import { useDeleteDocument } from '@/utils/hooks/api/use-delete-document'
import { useList } from '@/utils/hooks/api/use-list'
import { usePaginatedData } from '@/utils/hooks/api/use-paginated-data'
import { useUpdateDocument } from '@/utils/hooks/api/use-update-document'

import {
  CreateReportBgImageDto,
  FindAllReportBgImagesParams,
  ReportBgImageDto,
  UpdateReportBgImageDto,
} from './types'

const moduleName: TModuleName = 'report-background-images'

export const useReportBgImagesList = () =>
  useList<ReportBgImageDto>(moduleName, getReportBgImagesList)

export const useReportBgImages = (params: FindAllReportBgImagesParams) =>
  usePaginatedData<FindAllReportBgImagesParams, ReportBgImageDto>(
    moduleName,
    params,
    getReportBgImages,
  )

export const useDeleteReportBgImage = () =>
  useDeleteDocument<ReportBgImageDto>(moduleName, deleteReportBgImage)

export const useUpdateReportBgImage = (id: string) =>
  useUpdateDocument<UpdateReportBgImageDto, ReportBgImageDto>(
    moduleName,
    id,
    updateReportBgImage,
  )

export const useCreateReportBgImage = () =>
  useCreateDocument<CreateReportBgImageDto, ReportBgImageDto>(
    moduleName,
    createReportBgImage,
  )
