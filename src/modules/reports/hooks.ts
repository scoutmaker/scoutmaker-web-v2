import {
  createReport,
  deleteReport,
  getReports,
  getReportsList,
  likeReport,
  unlikeReport,
  updateReport,
} from '@/services/api/methods/reports'
import { TModuleName } from '@/services/api/modules'
import { useCreateDocument } from '@/utils/hooks/api/use-create-document'
import { useDeleteDocument } from '@/utils/hooks/api/use-delete-document'
import { useLikeDocument } from '@/utils/hooks/api/use-like-document'
import { useList } from '@/utils/hooks/api/use-list'
import { usePaginatedData } from '@/utils/hooks/api/use-paginated-data'
import { useUnlikeDocument } from '@/utils/hooks/api/use-unlike-document'
import { useUpdateDocument } from '@/utils/hooks/api/use-update-document'

import {
  CreateReportDto,
  FindAllReportsParams,
  ReportBasicDataDto,
  ReportDto,
  ReportPaginatedDataDto,
  UpdateReportDto,
} from './types'

const moduleName: TModuleName = 'reports'

export const useReportsList = () =>
  useList<ReportBasicDataDto>(moduleName, getReportsList)

export const useReports = (params: FindAllReportsParams) =>
  usePaginatedData<FindAllReportsParams, ReportPaginatedDataDto>(
    moduleName,
    params,
    getReports,
  )

export const useCreateReport = () =>
  useCreateDocument<CreateReportDto, ReportDto>(moduleName, createReport)

export const useUpdateReport = (id: string) =>
  useUpdateDocument<UpdateReportDto, ReportDto>(moduleName, id, updateReport)

export const useDeleteReport = () =>
  useDeleteDocument<ReportDto>(moduleName, deleteReport)

export const useLikeReport = () =>
  useLikeDocument<ReportDto>(moduleName, likeReport)

export const useUnlikeReport = () =>
  useUnlikeDocument<ReportDto>(moduleName, unlikeReport)
