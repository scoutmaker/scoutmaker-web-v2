declare namespace Components {
    namespace Schemas {
        export interface AgencyBasicInfoDto {
            id: string;
            name: string;
            slug: string;
        }
        export interface AgencyDto {
            id: string;
            name: string;
            slug: string;
            city?: string;
            postalCode?: string;
            street?: string;
            transfermarktUrl?: string;
            email?: string;
            website?: string;
            twitter?: string;
            facebook?: string;
            instagram?: string;
            country: CountryDto;
        }
        export interface ApiPaginatedResponseDto {
            success: boolean;
            message: string;
        }
        export interface ApiResponseDto {
            success: boolean;
            message: string;
        }
        export interface ChangeRoleDto {
            role: "ADMIN" | "PLAYMAKER_SCOUT" | "PLAYMAKER_SCOUT_MANAGER" | "SCOUT";
        }
        export interface ClubBasicDataDto {
            id: string;
            name: string;
            slug: string;
        }
        export interface ClubDto {
            id: string;
            name: string;
            slug: string;
            lnpId?: string;
            city?: string;
            postalCode?: string;
            street?: string;
            website?: string;
            twitter?: string;
            facebook?: string;
            instagram?: string;
            country: CountryDto;
            region: RegionWithoutCountryDto;
        }
        export interface CompetitionAgeCategoryDto {
            id: string;
            name: string;
        }
        export interface CompetitionBasicDataDto {
            id: string;
            name: string;
            level: number;
            country: CountryDto;
        }
        export interface CompetitionDto {
            id: string;
            name: string;
            level: number;
            gender: "MALE" | "FEMALE";
            transfermarktUrl?: string;
            country: CountryDto;
            ageCategory: CompetitionAgeCategoryDto;
            type: CompetitionTypeDto;
            juniorLevel?: CompetitionJuniorLevelDto;
        }
        export interface CompetitionGroupBasicDataDto {
            id: string;
            name: string;
            competition: CompetitionBasicDataDto;
        }
        export interface CompetitionGroupDto {
            id: string;
            name: string;
            transfermarktUrl?: string;
            competition: CompetitionBasicDataDto;
            regions?: RegionWithoutCountryDto[];
        }
        export interface CompetitionJuniorLevelDto {
            id: string;
            name: string;
            level: number;
        }
        export interface CompetitionParticipationDto {
            id: string;
            season: SeasonDto;
            team: TeamWithoutCompetitionsAndClubDto;
            competition: CompetitionDto;
            group: CompetitionGroupBasicDataDto;
        }
        export interface CompetitionParticipationWithoutTeamDto {
            id?: string;
            season?: SeasonDto;
            competition?: CompetitionDto;
            group?: CompetitionGroupBasicDataDto;
        }
        export interface CompetitionTypeDto {
            id: string;
            name: string;
        }
        export interface Count {
            createdReports: number;
            createdNotes: number;
            createdInsiderNotes: number;
        }
        export interface CountryDto {
            id: string;
            name: string;
            code: string;
            isEuMember: boolean;
        }
        export interface CreateAgencyDto {
            id?: string;
            name: string;
            countryId: string;
            city?: string;
            postalCode?: string;
            street?: string;
            transfermarktUrl?: string;
            email?: string;
            website?: string;
            twitter?: string;
            facebook?: string;
            instagram?: string;
        }
        export interface CreateClubDto {
            id?: string;
            name: string;
            regionId?: string;
            countryId: string;
            lnpId?: string;
            city?: string;
            postalCode?: string;
            street?: string;
            website?: string;
            twitter?: string;
            facebook?: string;
            instagram?: string;
            isPublic?: boolean;
        }
        export interface CreateCompetitionAgeCategoryDto {
            id?: string;
            name: string;
        }
        export interface CreateCompetitionDto {
            id?: string;
            name: string;
            level: number;
            transfermarktUrl?: string;
            gender?: "MALE" | "FEMALE";
            countryId: string;
            ageCategoryId: string;
            typeId: string;
            juniorLevelId?: string;
        }
        export interface CreateCompetitionGroupDto {
            id?: string;
            name: string;
            competitionId: string;
            transfermarktUrl?: string;
            regionIds?: string[];
        }
        export interface CreateCompetitionJuniorLevelDto {
            id?: string;
            name: string;
            level: number;
        }
        export interface CreateCompetitionParticipationDto {
            id?: string;
            teamId: string;
            competitionId: string;
            seasonId: string;
            groupId?: string;
        }
        export interface CreateCompetitionTypeDto {
            id?: string;
            name: string;
        }
        export interface CreateCountryDto {
            id?: string;
            name: string;
            code: string;
            isEuMember?: boolean;
        }
        export interface CreateInsiderNoteDto {
            id?: string;
            informant?: string;
            description?: string;
            playerId: string;
            teamId?: string;
            competitionId?: string;
            competitionGroupId?: string;
        }
        export interface CreateMatchDto {
            id?: string;
            date: string;
            homeGoals?: number;
            awayGoals?: number;
            videoUrl?: string;
            homeTeamId: string;
            awayTeamId: string;
            competitionId: string;
            groupId?: string;
            seasonId: string;
        }
        export interface CreateNoteDto {
            id?: string;
            shirtNo?: number;
            description?: string;
            maxRatingScore?: number;
            rating?: number;
            playerId?: string;
            matchId?: string;
            positionPlayedId?: string;
            teamId?: string;
            competitionId?: string;
            competitionGroupId?: string;
        }
        export interface CreateOrderDto {
            id?: string;
            playerId?: string;
            matchId?: string;
            description?: string;
        }
        export interface CreateOrganizationDto {
            id?: string;
            name: string;
            memberIds: string[];
        }
        export interface CreateOrganizationInsiderNoteAceDto {
            organizationId: string;
            insiderNoteId: string;
            permissionLevel?: "READ" | "READ_AND_WRITE" | "FULL";
        }
        export interface CreateOrganizationNoteAceDto {
            organizationId: string;
            noteId: string;
            permissionLevel?: "READ" | "READ_AND_WRITE" | "FULL";
        }
        export interface CreateOrganizationPlayerAceDto {
            organizationId: string;
            playerId: string;
            permissionLevel?: "READ" | "READ_AND_WRITE" | "FULL";
        }
        export interface CreateOrganizationReportAceDto {
            organizationId: string;
            reportId: string;
            permissionLevel?: "READ" | "READ_AND_WRITE" | "FULL";
        }
        export interface CreateOrganizationSubscriptionDto {
            organizationId: string;
            startDate: string;
            endDate: string;
            competitionIds: string[];
            competitionGroupIds: string[];
        }
        export interface CreatePlayerDto {
            id?: string;
            firstName: string;
            lastName: string;
            countryId: string;
            primaryPositionId: string;
            secondaryPositionIds?: string[];
            teamId?: string;
            yearOfBirth: number;
            height?: number;
            weight?: number;
            footed: "LEFT" | "RIGHT" | "BOTH";
            lnpId?: string;
            lnpUrl?: string;
            minut90id?: string;
            minut90url?: string;
            transfermarktId?: string;
            transfermarktUrl?: string;
            scoutmakerv1Id?: string;
            isPublic?: boolean;
        }
        export interface CreatePlayerPositionDto {
            id?: string;
            name: string;
            code: string;
        }
        export interface CreatePlayerStatsDto {
            id?: string;
            playerId: string;
            matchId: string;
            minutesPlayed?: number;
            goals?: number;
            assists?: number;
            yellowCards?: number;
            redCards?: number;
            teamId?: string;
        }
        export interface CreateRegionDto {
            id?: string;
            name: string;
            countryId: string;
        }
        export interface CreateReportBackgroundImageDto {
            id?: string;
            name: string;
            url: string;
            isPublic: boolean;
        }
        export interface CreateReportDto {
            id?: string;
            shirtNo?: number;
            minutesPlayed?: number;
            goals?: number;
            assists?: number;
            yellowCards?: number;
            redCards?: number;
            videoUrl?: string;
            videoDescription?: string;
            finalRating?: number;
            summary?: string;
            templateId?: string;
            maxRatingScore?: number;
            playerId: string;
            orderId?: string;
            positionPlayedId?: string;
            teamId?: string;
            competitionId?: string;
            competitionGroupId?: string;
            matchId?: string;
            skillAssessments?: CreateReportSkillAssessmentDto[];
        }
        export interface CreateReportSkillAssessmentCategoryDto {
            id?: string;
            name: string;
            isPublic?: boolean;
        }
        export interface CreateReportSkillAssessmentDto {
            rating?: number;
            description?: string;
            templateId: string;
        }
        export interface CreateReportSkillAssessmentTemplateDto {
            id?: string;
            scoutmakerv1Id?: string;
            name: string;
            shortName: string;
            hasScore: boolean;
            categoryId: string;
        }
        export interface CreateReportTemplateDto {
            id?: string;
            scoutmakerv1Id?: string;
            name: string;
            maxRatingScore: number;
            isPublic?: boolean;
            skillAssessmentTemplateIds: string[];
        }
        export interface CreateSeasonDto {
            id?: string;
            name: string;
            startDate: string;
            endDate: string;
        }
        export interface CreateTeamAffiliationDto {
            id?: string;
            playerId: string;
            teamId: string;
            startDate: string;
            endDate?: string;
        }
        export interface CreateTeamDto {
            id?: string;
            name: string;
            clubId: string;
            competitionId?: string;
            groupId?: string;
            minut90url?: string;
            transfermarktUrl?: string;
            scoutmakerv1Id?: string;
            lnpId?: string;
            isPublic?: boolean;
        }
        export interface CreateUserDto {
            id?: string;
            role?: "ADMIN" | "PLAYMAKER_SCOUT" | "PLAYMAKER_SCOUT_MANAGER" | "SCOUT";
            status?: "PENDING" | "ACTIVE" | "BLOCKED";
            email: string;
            firstName: string;
            lastName: string;
            phone?: string;
            city?: string;
            password: string;
            activeRadius?: number;
            scoutmakerv1Id?: string;
            regionId?: string;
            footballRoleId?: string;
        }
        export interface CreateUserFootballRoleDto {
            id?: string;
            name: string;
        }
        export interface CreateUserInsiderNoteAceDto {
            userId: string;
            insiderNoteId: string;
            permissionLevel?: "READ" | "READ_AND_WRITE" | "FULL";
        }
        export interface CreateUserNoteAceDto {
            userId: string;
            noteId: string;
            permissionLevel?: "READ" | "READ_AND_WRITE" | "FULL";
        }
        export interface CreateUserPlayerAceDto {
            userId: string;
            playerId: string;
            permissionLevel?: "READ" | "READ_AND_WRITE" | "FULL";
        }
        export interface CreateUserReportAceDto {
            userId: string;
            reportId: string;
            permissionLevel?: "READ" | "READ_AND_WRITE" | "FULL";
        }
        export interface CreateUserSubscriptionDto {
            userId: string;
            startDate: string;
            endDate: string;
            competitionIds: string[];
            competitionGroupIds: string[];
        }
        export interface DashboardDto {
            user: UserDashboardDto;
            reports?: number;
            reportsRatio?: number;
            notes?: number;
            notesRatio?: number;
            observedMatches?: number;
            observedMatchesRatio?: number;
            organizations?: OrganizationInfoDto[];
            scouts?: number;
            observerdPlayers?: number;
            topNotes?: DashboardNoteDto[];
            topReports?: DashboardReportDto[];
            topPlayers?: DashboardPlayerDto[];
        }
        export interface DashboardNoteDto {
            player?: PlayerSuperBasicDataDto;
            id: string;
            docNumber: number;
            description?: string;
            rating?: number;
            createdAt: string; // date-time
            shirtNo?: number;
            match?: MatchBasicDataDto;
        }
        export interface DashboardPlayerDto {
            id: string;
            firstName: string;
            lastName: string;
            slug: string;
            averageRating: number;
        }
        export interface DashboardReportDto {
            id: string;
            player: PlayerSuperBasicDataDto;
            createdAt: string; // date-time
            finalRating?: number;
            match?: MatchBasicDataDto;
            docNumber: number;
        }
        export interface FollowAgencyDto {
            agency: AgencyBasicInfoDto;
            follower: UserBasicDataDto;
        }
        export interface FollowPlayerDto {
            player: PlayerBasicDataWithoutTeamsDto;
            follower: UserBasicDataDto;
        }
        export interface FollowScoutDto {
            scout: UserBasicDataDto;
            follower: UserBasicDataDto;
        }
        export interface FollowTeamDto {
            team: TeamBasicDataDto;
            follower: UserBasicDataDto;
        }
        export interface ForgotPasswordDto {
            email: string;
        }
        export interface InsiderNoteBasicDataDto {
            id: string;
            docNumber: number;
            player: PlayerBasicDataWithoutTeamsDto;
            author: UserBasicDataDto;
        }
        export interface InsiderNoteDto {
            id: string;
            docNumber: number;
            informant?: string;
            description?: string;
            player: PlayerBasicDataWithoutTeamsDto;
            author: UserBasicDataDto;
            createdAt: string; // date-time
            likes: LikeInsiderNoteBasicDataDto[];
            meta?: InsiderNoteMetaDto;
        }
        export interface InsiderNoteMetaDto {
            id: string;
            team: TeamBasicDataDto;
            competition: CompetitionBasicDataDto;
            competitionGroup: CompetitionGroupBasicDataDto;
        }
        export interface InsiderNoteSuperBasicDataDto {
            id: string;
            docNumber: number;
            createdAt: string; // date-time
        }
        export interface LikeInsiderNoteBasicDataDto {
            userId: string;
            insiderNoteId: string;
        }
        export interface LikeInsiderNoteDto {
            insiderNote: InsiderNoteSuperBasicDataDto;
            user: UserBasicDataDto;
        }
        export interface LikeNoteBasicDataDto {
            userId: string;
            noteId: string;
        }
        export interface LikeNoteDto {
            note: NoteSuperBasicDataDto;
            user: UserBasicDataDto;
        }
        export interface LikePlayerBasicDataDto {
            userId: string;
            playerId: string;
        }
        export interface LikePlayerDto {
            player: PlayerSuperBasicDataDto;
            user: UserBasicDataDto;
        }
        export interface LikeReportBasicDataDto {
            userId: string;
            reportId: string;
        }
        export interface LikeReportDto {
            report: ReportSuperBasicDataDto;
            user: UserBasicDataDto;
        }
        export interface LikeTeamBasicDataDto {
            userId: string;
            teamId: string;
        }
        export interface LikeTeamDto {
            team: TeamBasicDataDto;
            user: UserBasicDataDto;
        }
        export interface LoginDto {
            email: string;
            password: string;
        }
        export interface MatchAttendanceDto {
            isActive: boolean;
            user: UserBasicDataDto;
            match: MatchBasicDataDto;
        }
        export interface MatchBasicDataDto {
            id: string;
            date: string; // date-time
            homeTeam: TeamBasicDataDto;
            awayTeam: TeamBasicDataDto;
            competition: CompetitionBasicDataDto;
        }
        export interface MatchDto {
            id: string;
            date: string; // date-time
            homeGoals?: number;
            awayGoals?: number;
            videoUrl?: string;
            homeTeam: TeamBasicDataDto;
            awayTeam: TeamBasicDataDto;
            competition: CompetitionBasicDataDto;
            group?: CompetitionGroupBasicDataDto;
            season: SeasonBasicDataDto;
            _count: Count;
        }
        export interface NoteBasicDataDto {
            id: string;
            docNumber: number;
            player?: PlayerBasicDataWithoutTeamsDto;
            description?: string;
            rating?: number;
            createdAt: string; // date-time
            shirtNo?: number;
        }
        export interface NoteDto {
            id: string;
            docNumber: number;
            shirtNo?: number;
            description?: string;
            maxRatingScore?: number;
            rating?: number;
            percentageRating?: number;
            createdAt: string; // date-time
            player?: PlayerBasicDataWithoutTeamsDto;
            match?: MatchBasicDataDto;
            author: UserBasicDataDto;
            likes: LikeNoteBasicDataDto[];
            meta?: NoteMetaDto;
        }
        export interface NoteMetaBasicDataDto {
            id: string;
            team: TeamBasicDataDto;
            position: PlayerPositionDto;
        }
        export interface NoteMetaDto {
            id: string;
            team: TeamBasicDataDto;
            position: PlayerPositionDto;
            competition: CompetitionBasicDataDto;
            competitionGroup: CompetitionGroupBasicDataDto;
        }
        export interface NotePaginatedDataDto {
            player?: PlayerSuperBasicDataDto;
            meta?: NoteMetaBasicDataDto;
            id: string;
            docNumber: number;
            shirtNo?: number;
            description?: string;
            maxRatingScore?: number;
            rating?: number;
            percentageRating?: number;
            createdAt: string; // date-time
            match?: MatchBasicDataDto;
            author: UserBasicDataDto;
            likes: LikeNoteBasicDataDto[];
        }
        export interface NoteSuperBasicDataDto {
            id: string;
            createdAt: string; // date-time
        }
        export interface OrderBasicDataDto {
            player?: PlayerSuperBasicInfoDto;
            id: string;
            docNumber: number;
            match?: MatchBasicDataDto;
            status: "OPEN" | "ACCEPTED" | "CLOSED";
            createdAt: string; // date-time
        }
        export interface OrderCount {
            reports: number;
        }
        export interface OrderDto {
            id: string;
            docNumber: number;
            status: "OPEN" | "ACCEPTED" | "CLOSED";
            description?: string;
            acceptDate?: string; // date-time
            closeDate?: string; // date-time
            createdAt: string; // date-time
            author: UserBasicDataDto;
            scout?: UserBasicDataDto;
            player?: PlayerBasicDataDto;
            match?: MatchBasicDataDto;
            _count: OrderCount;
        }
        export interface OrganizationBasicDataDto {
            id: string;
            name: string;
        }
        export interface OrganizationDto {
            id: string;
            name: string;
            members: UserBasicDataDto[];
            createdAt: string; // date-time
        }
        export interface OrganizationInfoDto {
            name: string;
            sharedInfo: number;
        }
        export interface OrganizationInsiderNoteAceDto {
            id: string;
            organization: OrganizationBasicDataDto;
            insiderNote: InsiderNoteSuperBasicDataDto;
            permissionLevel: "READ" | "READ_AND_WRITE" | "FULL";
            createdAt: string; // date-time
        }
        export interface OrganizationNoteAceDto {
            id: string;
            organization: OrganizationBasicDataDto;
            note: NoteSuperBasicDataDto;
            permissionLevel: "READ" | "READ_AND_WRITE" | "FULL";
            createdAt: string; // date-time
        }
        export interface OrganizationPlayerAceDto {
            id: string;
            organization: OrganizationBasicDataDto;
            player: PlayerSuperBasicDataDto;
            permissionLevel: "READ" | "READ_AND_WRITE" | "FULL";
            createdAt: string; // date-time
        }
        export interface OrganizationReportAceDto {
            id: string;
            organization: OrganizationBasicDataDto;
            report: ReportSuperBasicDataDto;
            permissionLevel: "READ" | "READ_AND_WRITE" | "FULL";
            createdAt: string; // date-time
        }
        export interface OrganizationSubscriptionDto {
            id: string;
            startDate: string; // date-time
            endDate: string; // date-time
            organization: OrganizationBasicDataDto;
            competitions: CompetitionBasicDataDto[];
            competitionGroups: CompetitionGroupBasicDataDto[];
        }
        export interface PasswordResetDto {
            password: string; // [object Object]
            passwordConfirm: string;
        }
        export interface PlayerBasicDataDto {
            footed: "LEFT" | "RIGHT" | "BOTH";
            id: string;
            firstName: string;
            lastName: string;
            slug: string;
            country: CountryDto;
            yearOfBirth: number;
            primaryPosition: PlayerPositionDto;
            teams: TeamAffiliationWithoutPlayerDto[];
        }
        export interface PlayerBasicDataWithoutTeamsDto {
            footed: "LEFT" | "RIGHT" | "BOTH";
            id: string;
            firstName: string;
            lastName: string;
            slug: string;
            country: CountryDto;
            yearOfBirth: number;
            primaryPosition: PlayerPositionDto;
        }
        export interface PlayerDto {
            footed: "LEFT" | "RIGHT" | "BOTH";
            id: string;
            firstName: string;
            lastName: string;
            slug: string;
            yearOfBirth: number;
            height?: number;
            weight?: number;
            lnpId?: string;
            lnpUrl?: string;
            minut90id?: string;
            minut90url?: string;
            transfermarktId?: string;
            transfermarktUrl?: string;
            country: CountryDto;
            primaryPosition: PlayerPositionDto;
            secondaryPositions: PlayerPositionDto[];
            teams: TeamAffiliationWithoutPlayerDto[];
            likes: LikePlayerBasicDataDto[];
            _count: Count;
        }
        export interface PlayerPositionDto {
            id: string;
            name: string;
            code: string;
        }
        export interface PlayerStatsDto {
            id: string;
            player: PlayerBasicDataDto;
            match: MatchBasicDataDto;
            minutesPlayed: number;
            goals: number;
            assists: number;
            yellowCards: number;
            redCards: number;
        }
        export interface PlayerSuperBasicDataDto {
            id: string;
            firstName: string;
            lastName: string;
            slug: string;
        }
        export interface PlayerSuperBasicInfoDto {
            id: string;
            firstName: string;
            lastName: string;
        }
        export interface RegionDto {
            id: string;
            name: string;
            country: CountryDto;
        }
        export interface RegionWithoutCountryDto {
            id: string;
            name: string;
        }
        export interface RegisterUserDto {
            email: string;
            firstName: string;
            lastName: string;
            clubId?: string;
            footballRoleId?: string;
            phone?: string;
            city?: string;
            password: string; // [object Object]
            passwordConfirm: string;
            activeRadius?: number;
            regionId?: string;
        }
        export interface ReportBackgroundImageDto {
            id: string;
            name: string;
            url: string;
        }
        export interface ReportBasicDataDto {
            status: "IN_PROGRESS" | "FINISHED";
            id: string;
            docNumber: number;
            player: PlayerSuperBasicDataDto;
            author: UserBasicDataDto;
        }
        export interface ReportDto {
            status: "IN_PROGRESS" | "FINISHED";
            id: string;
            docNumber: number;
            maxRatingScore: number;
            shirtNo?: number;
            minutesPlayed?: number;
            goals?: number;
            assists?: number;
            yellowCards?: number;
            redCards?: number;
            videoUrl?: string;
            videoDescription?: string;
            finalRating?: number;
            summary?: string;
            avgRating?: number;
            percentageRating?: number;
            createdAt: string; // date-time
            player: PlayerSuperBasicDataDto;
            match?: MatchBasicDataDto;
            author: UserBasicDataDto;
            skills: ReportSkillAssessmentBasicDataDto[];
            likes: LikeReportBasicDataDto[];
            meta?: ReportMetaDto;
        }
        export interface ReportMetaBasicDataDto {
            id: string;
            team: TeamBasicDataDto;
            position: PlayerPositionDto;
        }
        export interface ReportMetaDto {
            id: string;
            team: TeamBasicDataDto;
            position: PlayerPositionDto;
            competition: CompetitionBasicDataDto;
            competitionGroup: CompetitionGroupBasicDataDto;
        }
        export interface ReportPaginatedDataDto {
            status: "IN_PROGRESS" | "FINISHED";
            meta?: ReportMetaBasicDataDto;
            id: string;
            docNumber: number;
            player: PlayerSuperBasicDataDto;
            finalRating?: number;
            percentageRating?: number;
            videoUrl?: string;
            author: UserBasicDataDto;
            createdAt: string; // date-time
            likes: LikeReportBasicDataDto[];
            match?: MatchBasicDataDto;
            videoDescription?: string;
            summary?: string;
        }
        export interface ReportSkillAssessmentBasicDataDto {
            id: string;
            rating?: number;
            description?: string;
            template: ReportSkillAssessmentTemplateDto;
        }
        export interface ReportSkillAssessmentCategoryDto {
            id: string;
            name: string;
        }
        export interface ReportSkillAssessmentDto {
            id: string;
            rating?: number;
            description?: string;
            template: ReportSkillAssessmentTemplateDto;
            report: ReportBasicDataDto;
        }
        export interface ReportSkillAssessmentTemplateDto {
            id: string;
            name: string;
            shortName: string;
            hasScore: boolean;
            category: ReportSkillAssessmentCategoryDto;
        }
        export interface ReportSuperBasicDataDto {
            id: string;
            docNumber: number;
            createdAt: string; // date-time
        }
        export interface ReportTemplateBasicDataDto {
            id: string;
            name: string;
            maxRatingScore: number;
        }
        export interface ReportTemplateDto {
            id: string;
            name: string;
            maxRatingScore: number;
            skillAssessmentTemplates: ReportSkillAssessmentTemplateDto[];
        }
        export interface SeasonBasicDataDto {
            id: string;
            name: string;
        }
        export interface SeasonDto {
            id: string;
            name: string;
            isActive: boolean;
            startDate: string; // date-time
            endDate: string; // date-time
        }
        export interface TeamAffiliationDto {
            id: string;
            player: PlayerSuperBasicDataDto;
            team: TeamBasicDataDto;
            startDate: string; // date-time
            endDate?: string; // date-time
        }
        export interface TeamAffiliationWithoutPlayerDto {
            id: string;
            team: TeamBasicDataDto;
            startDate: string; // date-time
            endDate?: string; // date-time
        }
        export interface TeamBasicDataDto {
            id: string;
            name: string;
            slug: string;
        }
        export interface TeamDto {
            id: string;
            name: string;
            slug: string;
            competitions: CompetitionParticipationWithoutTeamDto[];
            minut90url?: string;
            transfermarktUrl?: string;
            lnpId?: string;
            club: ClubBasicDataDto;
            likes: LikeTeamBasicDataDto[];
        }
        export interface TeamWithoutCompetitionsAndClubDto {
            id: string;
            name: string;
            slug: string;
            minut90url?: string;
            transfermarktUrl?: string;
            lnpId?: string;
            likes: LikeTeamBasicDataDto[];
        }
        export interface ToggleIsActiveDto {
            isActive: boolean;
        }
        export interface ToggleMembershipDto {
            memberId: string;
        }
        export interface UpdateAgencyDto {
            name?: string;
            countryId?: string;
            city?: string;
            postalCode?: string;
            street?: string;
            transfermarktUrl?: string;
            email?: string;
            website?: string;
            twitter?: string;
            facebook?: string;
            instagram?: string;
        }
        export interface UpdateClubDto {
            name?: string;
            regionId?: string;
            countryId?: string;
            lnpId?: string;
            city?: string;
            postalCode?: string;
            street?: string;
            website?: string;
            twitter?: string;
            facebook?: string;
            instagram?: string;
            isPublic?: boolean;
        }
        export interface UpdateCompetitionAgeCategoryDto {
            name?: string;
        }
        export interface UpdateCompetitionDto {
            name?: string;
            level?: number;
            transfermarktUrl?: string;
            gender?: "MALE" | "FEMALE";
            countryId?: string;
            ageCategoryId?: string;
            typeId?: string;
            juniorLevelId?: string;
        }
        export interface UpdateCompetitionGroupDto {
            name?: string;
            competitionId?: string;
            transfermarktUrl?: string;
            regionIds?: string[];
        }
        export interface UpdateCompetitionJuniorLevelDto {
            name?: string;
            level?: number;
        }
        export interface UpdateCompetitionParticipationDto {
            teamId?: string;
            competitionId?: string;
            seasonId?: string;
            groupId?: string;
        }
        export interface UpdateCompetitionTypeDto {
            name?: string;
        }
        export interface UpdateCountryDto {
            name?: string;
            code?: string;
            isEuMember?: boolean;
        }
        export interface UpdateInsiderNoteDto {
            informant?: string;
            description?: string;
            playerId?: string;
            teamId?: string;
            competitionId?: string;
            competitionGroupId?: string;
        }
        export interface UpdateMatchDto {
            date?: string;
            homeGoals?: number;
            awayGoals?: number;
            videoUrl?: string;
            homeTeamId?: string;
            awayTeamId?: string;
            competitionId?: string;
            groupId?: string;
            seasonId?: string;
        }
        export interface UpdateNoteDto {
            shirtNo?: number;
            description?: string;
            maxRatingScore?: number;
            rating?: number;
            playerId?: string;
            matchId?: string;
            positionPlayedId?: string;
            teamId?: string;
            competitionId?: string;
            competitionGroupId?: string;
        }
        export interface UpdateOrganizationDto {
            name?: string;
        }
        export interface UpdateOrganizationInsiderNoteAceDto {
            permissionLevel?: "READ" | "READ_AND_WRITE" | "FULL";
        }
        export interface UpdateOrganizationNoteAceDto {
            permissionLevel?: "READ" | "READ_AND_WRITE" | "FULL";
        }
        export interface UpdateOrganizationPlayerAceDto {
            permissionLevel?: "READ" | "READ_AND_WRITE" | "FULL";
        }
        export interface UpdateOrganizationReportAceDto {
            permissionLevel?: "READ" | "READ_AND_WRITE" | "FULL";
        }
        export interface UpdateOrganizationSubscriptionDto {
            startDate?: string;
            endDate?: string;
            competitionIds?: string[];
            competitionGroupIds?: string[];
        }
        export interface UpdatePasswordDto {
            oldPassword: string;
            newPassword: string; // [object Object]
            newPasswordConfirm: string;
        }
        export interface UpdatePlayerDto {
            firstName?: string;
            lastName?: string;
            countryId?: string;
            primaryPositionId?: string;
            secondaryPositionIds?: string[];
            yearOfBirth?: number;
            height?: number;
            weight?: number;
            footed?: "LEFT" | "RIGHT" | "BOTH";
            lnpId?: string;
            lnpUrl?: string;
            minut90id?: string;
            minut90url?: string;
            transfermarktId?: string;
            transfermarktUrl?: string;
            scoutmakerv1Id?: string;
            isPublic?: boolean;
        }
        export interface UpdatePlayerPositionDto {
            name?: string;
            code?: string;
        }
        export interface UpdatePlayerStatsDto {
            playerId?: string;
            matchId?: string;
            minutesPlayed?: number;
            goals?: number;
            assists?: number;
            yellowCards?: number;
            redCards?: number;
            teamId?: string;
        }
        export interface UpdateRegionDto {
            name?: string;
            countryId?: string;
        }
        export interface UpdateReportBackgroundImageDto {
            name?: string;
            url?: string;
            isPublic?: boolean;
        }
        export interface UpdateReportDto {
            shirtNo?: number;
            minutesPlayed?: number;
            goals?: number;
            assists?: number;
            yellowCards?: number;
            redCards?: number;
            videoUrl?: string;
            videoDescription?: string;
            finalRating?: number;
            summary?: string;
            maxRatingScore?: number;
            playerId?: string;
            orderId?: string;
            positionPlayedId?: string;
            teamId?: string;
            competitionId?: string;
            competitionGroupId?: string;
            matchId?: string;
            skillAssessments?: CreateReportSkillAssessmentDto[];
        }
        export interface UpdateReportSkillAssessmentCategoryDto {
            name?: string;
            isPublic?: boolean;
        }
        export interface UpdateReportSkillAssessmentTemplateDto {
            scoutmakerv1Id?: string;
            name?: string;
            shortName?: string;
            hasScore?: boolean;
            categoryId?: string;
        }
        export interface UpdateReportTemplateDto {
            scoutmakerv1Id?: string;
            name?: string;
            maxRatingScore?: number;
            isPublic?: boolean;
            skillAssessmentTemplateIds?: string[];
        }
        export interface UpdateSeasonDto {
            name?: string;
            startDate?: string;
            endDate?: string;
        }
        export interface UpdateTeamAffiliationDto {
            startDate?: string;
            endDate?: string;
        }
        export interface UpdateTeamDto {
            name?: string;
            clubId?: string;
            minut90url?: string;
            transfermarktUrl?: string;
            scoutmakerv1Id?: string;
            lnpId?: string;
        }
        export interface UpdateUserDto {
            firstName?: string;
            lastName?: string;
            clubId?: string;
            footballRoleId?: string;
            phone?: string;
            city?: string;
            activeRadius?: number;
            regionId?: string;
        }
        export interface UpdateUserFootballRoleDto {
            name?: string;
        }
        export interface UpdateUserInsiderNoteAceDto {
            permissionLevel?: "READ" | "READ_AND_WRITE" | "FULL";
        }
        export interface UpdateUserNoteAceDto {
            permissionLevel?: "READ" | "READ_AND_WRITE" | "FULL";
        }
        export interface UpdateUserPlayerAceDto {
            permissionLevel?: "READ" | "READ_AND_WRITE" | "FULL";
        }
        export interface UpdateUserReportAceDto {
            permissionLevel?: "READ" | "READ_AND_WRITE" | "FULL";
        }
        export interface UpdateUserSubscriptionDto {
            startDate?: string;
            endDate?: string;
            competitionIds?: string[];
            competitionGroupIds?: string[];
        }
        export interface UserBasicDataDto {
            id: string;
            firstName: string;
            lastName: string;
            email: string;
        }
        export interface UserDashboardDto {
            role: "SCOUT" | "PLAYMAKER_SCOUT" | "PLAYMAKER_SCOUT_MANAGER" | "ADMIN";
            organizationId: string;
            id: string;
        }
        export interface UserDto {
            role: "SCOUT" | "PLAYMAKER_SCOUT" | "PLAYMAKER_SCOUT_MANAGER" | "ADMIN";
            status: "PENDING" | "ACTIVE" | "BLOCKED";
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            phone?: string;
            city?: string;
            activeRadius: number;
            region: RegionDto;
            club?: ClubBasicDataDto;
            footballRole?: UserFootballRoleDto;
            _count: Count;
        }
        export interface UserFootballRoleDto {
            id: string;
            name: string;
        }
        export interface UserInsiderNoteAceDto {
            id: string;
            user: UserBasicDataDto;
            insiderNote: InsiderNoteSuperBasicDataDto;
            permissionLevel: "READ" | "READ_AND_WRITE" | "FULL";
            createdAt: string; // date-time
        }
        export interface UserNoteAceDto {
            id: string;
            user: UserBasicDataDto;
            note: NoteSuperBasicDataDto;
            permissionLevel: "READ" | "READ_AND_WRITE" | "FULL";
            createdAt: string; // date-time
        }
        export interface UserPlayerAceDto {
            id: string;
            user: UserBasicDataDto;
            player: PlayerSuperBasicDataDto;
            permissionLevel: "READ" | "READ_AND_WRITE" | "FULL";
            createdAt: string; // date-time
        }
        export interface UserReportAceDto {
            id: string;
            user: UserBasicDataDto;
            report: ReportSuperBasicDataDto;
            permissionLevel: "READ" | "READ_AND_WRITE" | "FULL";
            createdAt: string; // date-time
        }
        export interface UserSubscriptionDto {
            id: string;
            startDate: string; // date-time
            endDate: string; // date-time
            user: UserBasicDataDto;
            competitions: CompetitionBasicDataDto[];
            competitionGroups: CompetitionGroupBasicDataDto[];
        }
    }
}
declare namespace Paths {
    namespace AgenciesControllerCreate {
        export type RequestBody = Components.Schemas.CreateAgencyDto;
        namespace Responses {
            export interface $201 {
                success: boolean;
                message: string;
                data?: Components.Schemas.AgencyDto;
            }
        }
    }
    namespace AgenciesControllerFindAll {
        namespace Parameters {
            export type CountryId = string;
            export type Limit = number;
            export type Name = string;
            export type Page = number;
            export type SortBy = "id" | "name" | "country";
            export type SortingOrder = "asc" | "desc";
        }
        export interface QueryParameters {
            name?: Parameters.Name;
            countryId?: Parameters.CountryId;
            sortBy?: Parameters.SortBy;
            sortingOrder?: Parameters.SortingOrder;
            limit?: Parameters.Limit;
            page?: Parameters.Page;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.AgencyDto;
            }
        }
    }
    namespace AgenciesControllerFindOne {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.AgencyDto;
            }
        }
    }
    namespace AgenciesControllerGetList {
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.AgencyBasicInfoDto;
            }
        }
    }
    namespace AgenciesControllerRemove {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.AgencyDto;
            }
        }
    }
    namespace AgenciesControllerUpdate {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.UpdateAgencyDto;
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.AgencyDto;
            }
        }
    }
    namespace AppControllerGetHello {
        namespace Responses {
            export type $200 = string;
        }
    }
    namespace AuthControllerForgotPassword {
        export type RequestBody = Components.Schemas.ForgotPasswordDto;
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.UserDto;
            }
        }
    }
    namespace AuthControllerGetAccount {
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.UserDto;
            }
        }
    }
    namespace AuthControllerLogin {
        export type RequestBody = Components.Schemas.LoginDto;
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.UserDto;
            }
        }
    }
    namespace AuthControllerRegister {
        export type RequestBody = Components.Schemas.RegisterUserDto;
        namespace Responses {
            export interface $201 {
                success: boolean;
                message: string;
                data?: Components.Schemas.UserDto;
            }
        }
    }
    namespace AuthControllerResetPassword {
        namespace Parameters {
            export type ResetPasswordToken = string;
        }
        export interface PathParameters {
            resetPasswordToken: Parameters.ResetPasswordToken;
        }
        export type RequestBody = Components.Schemas.PasswordResetDto;
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.UserDto;
            }
        }
    }
    namespace AuthControllerUpdateAccount {
        export type RequestBody = Components.Schemas.UpdateUserDto;
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.UserDto;
            }
        }
    }
    namespace AuthControllerUpdatePassword {
        export type RequestBody = Components.Schemas.UpdatePasswordDto;
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.UserDto;
            }
        }
    }
    namespace AuthControllerVerify {
        namespace Parameters {
            export type ConfirmationCode = string;
        }
        export interface PathParameters {
            confirmationCode: Parameters.ConfirmationCode;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.UserDto;
            }
        }
    }
    namespace ClubsControllerCreate {
        export type RequestBody = Components.Schemas.CreateClubDto;
        namespace Responses {
            export interface $201 {
                success: boolean;
                message: string;
                data?: Components.Schemas.ClubDto;
            }
        }
    }
    namespace ClubsControllerFindAll {
        namespace Parameters {
            export type CountryId = string;
            export type Limit = number;
            export type Name = string;
            export type Page = number;
            export type RegionId = string;
            export type SortBy = "id" | "name" | "countryId" | "regionId";
            export type SortingOrder = "asc" | "desc";
        }
        export interface QueryParameters {
            name?: Parameters.Name;
            regionId?: Parameters.RegionId;
            countryId?: Parameters.CountryId;
            sortBy?: Parameters.SortBy;
            sortingOrder?: Parameters.SortingOrder;
            limit?: Parameters.Limit;
            page?: Parameters.Page;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: {
                    totalDocs?: number;
                    limit?: number;
                    page?: number;
                    totalPages?: number;
                    hasPrevPage?: boolean;
                    hasNextPage?: boolean;
                    prevPage?: number | null;
                    nextPage?: number | null;
                    docs?: Components.Schemas.ClubDto[];
                };
            }
        }
    }
    namespace ClubsControllerFindOne {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.ClubDto;
            }
        }
    }
    namespace ClubsControllerFindOneBySlug {
        namespace Parameters {
            export type Slug = string;
        }
        export interface PathParameters {
            slug: Parameters.Slug;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.ClubDto;
            }
        }
    }
    namespace ClubsControllerGetList {
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.ClubBasicDataDto;
            }
        }
    }
    namespace ClubsControllerRemove {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.ClubDto;
            }
        }
    }
    namespace ClubsControllerUpdate {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.UpdateClubDto;
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.ClubDto;
            }
        }
    }
    namespace ClubsControllerUploadFile {
        export interface RequestBody {
            file?: string; // binary
        }
        namespace Responses {
            export interface $201 {
            }
        }
    }
    namespace CompetitionAgeCategoriesControllerCreate {
        export type RequestBody = Components.Schemas.CreateCompetitionAgeCategoryDto;
        namespace Responses {
            export interface $201 {
                success: boolean;
                message: string;
                data?: Components.Schemas.CompetitionAgeCategoryDto;
            }
        }
    }
    namespace CompetitionAgeCategoriesControllerFindAll {
        namespace Parameters {
            export type Limit = number;
            export type Name = string;
            export type Page = number;
            export type SortBy = "id" | "name";
            export type SortingOrder = "asc" | "desc";
        }
        export interface QueryParameters {
            name?: Parameters.Name;
            sortBy?: Parameters.SortBy;
            sortingOrder?: Parameters.SortingOrder;
            limit?: Parameters.Limit;
            page?: Parameters.Page;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: {
                    totalDocs?: number;
                    limit?: number;
                    page?: number;
                    totalPages?: number;
                    hasPrevPage?: boolean;
                    hasNextPage?: boolean;
                    prevPage?: number | null;
                    nextPage?: number | null;
                    docs?: Components.Schemas.CompetitionAgeCategoryDto[];
                };
            }
        }
    }
    namespace CompetitionAgeCategoriesControllerFindOne {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.CompetitionAgeCategoryDto;
            }
        }
    }
    namespace CompetitionAgeCategoriesControllerGetList {
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.CompetitionAgeCategoryDto[];
            }
        }
    }
    namespace CompetitionAgeCategoriesControllerRemove {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.CompetitionAgeCategoryDto;
            }
        }
    }
    namespace CompetitionAgeCategoriesControllerUpdate {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.UpdateCompetitionAgeCategoryDto;
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.CompetitionAgeCategoryDto;
            }
        }
    }
    namespace CompetitionAgeCategoriesControllerUploadFile {
        export interface RequestBody {
            file?: string; // binary
        }
        namespace Responses {
            export interface $201 {
            }
        }
    }
    namespace CompetitionGroupsControllerCreate {
        export type RequestBody = Components.Schemas.CreateCompetitionGroupDto;
        namespace Responses {
            export interface $201 {
                success: boolean;
                message: string;
                data?: Components.Schemas.CompetitionGroupDto;
            }
        }
    }
    namespace CompetitionGroupsControllerFindAll {
        namespace Parameters {
            export type CompetitionIds = string[];
            export type Limit = number;
            export type Name = string;
            export type Page = number;
            export type RegionIds = string[];
            export type SortBy = "id" | "name" | "competition";
            export type SortingOrder = "asc" | "desc";
        }
        export interface QueryParameters {
            name?: Parameters.Name;
            competitionIds?: Parameters.CompetitionIds;
            regionIds?: Parameters.RegionIds;
            sortBy?: Parameters.SortBy;
            sortingOrder?: Parameters.SortingOrder;
            limit?: Parameters.Limit;
            page?: Parameters.Page;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: {
                    totalDocs?: number;
                    limit?: number;
                    page?: number;
                    totalPages?: number;
                    hasPrevPage?: boolean;
                    hasNextPage?: boolean;
                    prevPage?: number | null;
                    nextPage?: number | null;
                    docs?: Components.Schemas.CompetitionGroupDto[];
                };
            }
        }
    }
    namespace CompetitionGroupsControllerFindOne {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.CompetitionGroupDto;
            }
        }
    }
    namespace CompetitionGroupsControllerGetList {
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.CompetitionGroupBasicDataDto[];
            }
        }
    }
    namespace CompetitionGroupsControllerRemove {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.CompetitionGroupDto;
            }
        }
    }
    namespace CompetitionGroupsControllerUpdate {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.UpdateCompetitionGroupDto;
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.CompetitionGroupDto;
            }
        }
    }
    namespace CompetitionGroupsControllerUploadFile {
        export interface RequestBody {
            file?: string; // binary
        }
        namespace Responses {
            export interface $201 {
            }
        }
    }
    namespace CompetitionJuniorLevelsControllerCreate {
        export type RequestBody = Components.Schemas.CreateCompetitionJuniorLevelDto;
        namespace Responses {
            export interface $201 {
                success: boolean;
                message: string;
                data?: Components.Schemas.CompetitionJuniorLevelDto;
            }
        }
    }
    namespace CompetitionJuniorLevelsControllerFindAll {
        namespace Parameters {
            export type Level = number;
            export type Limit = number;
            export type Name = string;
            export type Page = number;
            export type SortBy = "id" | "name" | "level";
            export type SortingOrder = "asc" | "desc";
        }
        export interface QueryParameters {
            name?: Parameters.Name;
            level?: Parameters.Level;
            sortBy?: Parameters.SortBy;
            sortingOrder?: Parameters.SortingOrder;
            limit?: Parameters.Limit;
            page?: Parameters.Page;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: {
                    totalDocs?: number;
                    limit?: number;
                    page?: number;
                    totalPages?: number;
                    hasPrevPage?: boolean;
                    hasNextPage?: boolean;
                    prevPage?: number | null;
                    nextPage?: number | null;
                    docs?: Components.Schemas.CompetitionJuniorLevelDto[];
                };
            }
        }
    }
    namespace CompetitionJuniorLevelsControllerFindOne {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.CompetitionJuniorLevelDto;
            }
        }
    }
    namespace CompetitionJuniorLevelsControllerGetList {
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.CompetitionJuniorLevelDto[];
            }
        }
    }
    namespace CompetitionJuniorLevelsControllerRemove {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.CompetitionJuniorLevelDto;
            }
        }
    }
    namespace CompetitionJuniorLevelsControllerUpdate {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.UpdateCompetitionJuniorLevelDto;
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.CompetitionJuniorLevelDto;
            }
        }
    }
    namespace CompetitionParticipationsControllerCopyFromSeasonToSeason {
        namespace Parameters {
            export type FromSeasonId = string;
            export type ToSeasonId = string;
        }
        export interface PathParameters {
            fromSeasonId: Parameters.FromSeasonId;
            toSeasonId: Parameters.ToSeasonId;
        }
        namespace Responses {
            export interface $201 {
                success: boolean;
                message: string;
                data?: Components.Schemas.CompetitionParticipationDto;
            }
        }
    }
    namespace CompetitionParticipationsControllerCreate {
        export type RequestBody = Components.Schemas.CreateCompetitionParticipationDto;
        namespace Responses {
            export interface $201 {
                success: boolean;
                message: string;
                data?: Components.Schemas.CompetitionParticipationDto;
            }
        }
    }
    namespace CompetitionParticipationsControllerFindAll {
        namespace Parameters {
            export type CompetitionId = string;
            export type GroupId = string;
            export type Limit = number;
            export type Page = number;
            export type SeasonId = string;
            export type SortBy = "id" | "teamId" | "seasonId" | "competitionId" | "groupId";
            export type SortingOrder = "asc" | "desc";
            export type TeamId = string;
        }
        export interface QueryParameters {
            seasonId?: Parameters.SeasonId;
            teamId?: Parameters.TeamId;
            competitionId?: Parameters.CompetitionId;
            groupId?: Parameters.GroupId;
            sortBy?: Parameters.SortBy;
            sortingOrder?: Parameters.SortingOrder;
            limit?: Parameters.Limit;
            page?: Parameters.Page;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: {
                    totalDocs?: number;
                    limit?: number;
                    page?: number;
                    totalPages?: number;
                    hasPrevPage?: boolean;
                    hasNextPage?: boolean;
                    prevPage?: number | null;
                    nextPage?: number | null;
                    docs?: Components.Schemas.CompetitionParticipationDto[];
                };
            }
        }
    }
    namespace CompetitionParticipationsControllerFindOne {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.CompetitionParticipationDto;
            }
        }
    }
    namespace CompetitionParticipationsControllerGetList {
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.CompetitionParticipationDto;
            }
        }
    }
    namespace CompetitionParticipationsControllerRemove {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.CompetitionParticipationDto;
            }
        }
    }
    namespace CompetitionParticipationsControllerUpdate {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.UpdateCompetitionParticipationDto;
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.CompetitionParticipationDto;
            }
        }
    }
    namespace CompetitionParticipationsControllerUploadFile {
        export interface RequestBody {
            file?: string; // binary
        }
        namespace Responses {
            export interface $201 {
            }
        }
    }
    namespace CompetitionTypesControllerCreate {
        export type RequestBody = Components.Schemas.CreateCompetitionTypeDto;
        namespace Responses {
            export interface $201 {
                success: boolean;
                message: string;
                data?: Components.Schemas.CompetitionTypeDto;
            }
        }
    }
    namespace CompetitionTypesControllerFindAll {
        namespace Parameters {
            export type Limit = number;
            export type Name = string;
            export type Page = number;
            export type SortBy = "id" | "name";
            export type SortingOrder = "asc" | "desc";
        }
        export interface QueryParameters {
            name?: Parameters.Name;
            sortBy?: Parameters.SortBy;
            sortingOrder?: Parameters.SortingOrder;
            limit?: Parameters.Limit;
            page?: Parameters.Page;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: {
                    totalDocs?: number;
                    limit?: number;
                    page?: number;
                    totalPages?: number;
                    hasPrevPage?: boolean;
                    hasNextPage?: boolean;
                    prevPage?: number | null;
                    nextPage?: number | null;
                    docs?: Components.Schemas.CompetitionTypeDto[];
                };
            }
        }
    }
    namespace CompetitionTypesControllerFindOne {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.CompetitionTypeDto;
            }
        }
    }
    namespace CompetitionTypesControllerGetList {
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.CompetitionTypeDto[];
            }
        }
    }
    namespace CompetitionTypesControllerRemove {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.CompetitionTypeDto;
            }
        }
    }
    namespace CompetitionTypesControllerUpdate {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.UpdateCompetitionTypeDto;
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.CompetitionTypeDto;
            }
        }
    }
    namespace CompetitionTypesControllerUploadFile {
        export interface RequestBody {
            file?: string; // binary
        }
        namespace Responses {
            export interface $201 {
            }
        }
    }
    namespace CompetitionsControllerCreate {
        export type RequestBody = Components.Schemas.CreateCompetitionDto;
        namespace Responses {
            export interface $201 {
                success: boolean;
                message: string;
                data?: Components.Schemas.CompetitionDto;
            }
        }
    }
    namespace CompetitionsControllerFindAll {
        namespace Parameters {
            export type AgeCategoryId = string;
            export type CountryId = string;
            export type Gender = "MALE" | "FEMALE";
            export type JuniorLevelId = string;
            export type Level = number;
            export type Limit = number;
            export type Name = string;
            export type Page = number;
            export type SortBy = "id" | "name" | "level" | "gender" | "country" | "ageCategory" | "type" | "juniorLevel";
            export type SortingOrder = "asc" | "desc";
            export type TypeId = string;
        }
        export interface QueryParameters {
            name?: Parameters.Name;
            level?: Parameters.Level;
            gender?: Parameters.Gender;
            countryId?: Parameters.CountryId;
            ageCategoryId?: Parameters.AgeCategoryId;
            typeId?: Parameters.TypeId;
            juniorLevelId?: Parameters.JuniorLevelId;
            sortBy?: Parameters.SortBy;
            sortingOrder?: Parameters.SortingOrder;
            limit?: Parameters.Limit;
            page?: Parameters.Page;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: {
                    totalDocs?: number;
                    limit?: number;
                    page?: number;
                    totalPages?: number;
                    hasPrevPage?: boolean;
                    hasNextPage?: boolean;
                    prevPage?: number | null;
                    nextPage?: number | null;
                    docs?: Components.Schemas.CompetitionDto[];
                };
            }
        }
    }
    namespace CompetitionsControllerFindOne {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.CompetitionDto;
            }
        }
    }
    namespace CompetitionsControllerGetList {
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.CompetitionBasicDataDto;
            }
        }
    }
    namespace CompetitionsControllerRemove {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.CompetitionDto;
            }
        }
    }
    namespace CompetitionsControllerUpdate {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.UpdateCompetitionDto;
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.CompetitionDto;
            }
        }
    }
    namespace CompetitionsControllerUploadFile {
        export interface RequestBody {
            file?: string; // binary
        }
        namespace Responses {
            export interface $201 {
            }
        }
    }
    namespace CountriesControllerCreate {
        export type RequestBody = Components.Schemas.CreateCountryDto;
        namespace Responses {
            export interface $201 {
                success: boolean;
                message: string;
                data?: Components.Schemas.CountryDto;
            }
        }
    }
    namespace CountriesControllerFindAll {
        namespace Parameters {
            export type IsEuMember = boolean;
            export type Limit = number;
            export type Page = number;
            export type SortBy = "id" | "name" | "code" | "isEuMember";
            export type SortingOrder = "asc" | "desc";
        }
        export interface QueryParameters {
            isEuMember?: Parameters.IsEuMember;
            sortBy?: Parameters.SortBy;
            sortingOrder?: Parameters.SortingOrder;
            limit?: Parameters.Limit;
            page?: Parameters.Page;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: {
                    totalDocs?: number;
                    limit?: number;
                    page?: number;
                    totalPages?: number;
                    hasPrevPage?: boolean;
                    hasNextPage?: boolean;
                    prevPage?: number | null;
                    nextPage?: number | null;
                    docs?: Components.Schemas.CountryDto[];
                };
            }
        }
    }
    namespace CountriesControllerFindOne {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.CountryDto;
            }
        }
    }
    namespace CountriesControllerGetList {
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.CountryDto;
            }
        }
    }
    namespace CountriesControllerRemove {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.CountryDto;
            }
        }
    }
    namespace CountriesControllerUpdate {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.UpdateCountryDto;
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.CountryDto;
            }
        }
    }
    namespace CountriesControllerUploadFile {
        export interface RequestBody {
            file?: string; // binary
        }
        namespace Responses {
            export interface $201 {
            }
        }
    }
    namespace DashboardControllerGetData {
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.DashboardDto;
            }
        }
    }
    namespace FollowAgenciesControllerCreate {
        namespace Parameters {
            export type AgencyId = string;
        }
        export interface PathParameters {
            agencyId: Parameters.AgencyId;
        }
        namespace Responses {
            export interface $201 {
                success: boolean;
                message: string;
                data?: Components.Schemas.FollowAgencyDto;
            }
        }
    }
    namespace FollowAgenciesControllerRemove {
        namespace Parameters {
            export type AgencyId = string;
        }
        export interface PathParameters {
            agencyId: Parameters.AgencyId;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.FollowAgencyDto;
            }
        }
    }
    namespace FollowPlayersControllerCreate {
        namespace Parameters {
            export type PlayerId = string;
        }
        export interface PathParameters {
            playerId: Parameters.PlayerId;
        }
        namespace Responses {
            export interface $201 {
                success: boolean;
                message: string;
                data?: Components.Schemas.FollowPlayerDto;
            }
        }
    }
    namespace FollowPlayersControllerRemove {
        namespace Parameters {
            export type PlayerId = string;
        }
        export interface PathParameters {
            playerId: Parameters.PlayerId;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.FollowPlayerDto;
            }
        }
    }
    namespace FollowScoutsControllerCreate {
        namespace Parameters {
            export type ScoutId = string;
        }
        export interface PathParameters {
            scoutId: Parameters.ScoutId;
        }
        namespace Responses {
            export interface $201 {
                success: boolean;
                message: string;
                data?: Components.Schemas.FollowScoutDto;
            }
        }
    }
    namespace FollowScoutsControllerRemove {
        namespace Parameters {
            export type ScoutId = string;
        }
        export interface PathParameters {
            scoutId: Parameters.ScoutId;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.FollowScoutDto;
            }
        }
    }
    namespace FollowTeamsControllerCreate {
        namespace Parameters {
            export type TeamId = string;
        }
        export interface PathParameters {
            teamId: Parameters.TeamId;
        }
        namespace Responses {
            export interface $201 {
                success: boolean;
                message: string;
                data?: Components.Schemas.FollowTeamDto;
            }
        }
    }
    namespace FollowTeamsControllerRemove {
        namespace Parameters {
            export type TeamId = string;
        }
        export interface PathParameters {
            teamId: Parameters.TeamId;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.FollowTeamDto;
            }
        }
    }
    namespace InsiderNotesControllerCreate {
        export type RequestBody = Components.Schemas.CreateInsiderNoteDto;
        namespace Responses {
            export interface $201 {
                success: boolean;
                message: string;
                data?: Components.Schemas.InsiderNoteDto;
            }
        }
    }
    namespace InsiderNotesControllerFindAll {
        namespace Parameters {
            export type CompetitionGroupIds = string[];
            export type CompetitionIds = string[];
            export type IsLiked = boolean;
            export type Limit = number;
            export type Page = number;
            export type PlayerIds = string[];
            export type PositionIds = string[];
            export type SortBy = "id" | "player" | "createdAt";
            export type SortingOrder = "asc" | "desc";
            export type TeamIds = string[];
        }
        export interface QueryParameters {
            playerIds?: Parameters.PlayerIds;
            positionIds?: Parameters.PositionIds;
            teamIds?: Parameters.TeamIds;
            competitionIds?: Parameters.CompetitionIds;
            competitionGroupIds?: Parameters.CompetitionGroupIds;
            isLiked?: Parameters.IsLiked;
            sortBy?: Parameters.SortBy;
            sortingOrder?: Parameters.SortingOrder;
            limit?: Parameters.Limit;
            page?: Parameters.Page;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: {
                    totalDocs?: number;
                    limit?: number;
                    page?: number;
                    totalPages?: number;
                    hasPrevPage?: boolean;
                    hasNextPage?: boolean;
                    prevPage?: number | null;
                    nextPage?: number | null;
                    docs?: Components.Schemas.InsiderNoteDto[];
                };
            }
        }
    }
    namespace InsiderNotesControllerFindOne {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
            }
            export interface $201 {
                success: boolean;
                message: string;
                data?: Components.Schemas.InsiderNoteDto;
            }
        }
    }
    namespace InsiderNotesControllerGetList {
        namespace Responses {
            export interface $200 {
            }
            export interface $201 {
                success: boolean;
                message: string;
                data?: Components.Schemas.InsiderNoteBasicDataDto;
            }
        }
    }
    namespace InsiderNotesControllerRemove {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.InsiderNoteDto;
            }
        }
    }
    namespace InsiderNotesControllerUpdate {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.UpdateInsiderNoteDto;
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.InsiderNoteDto;
            }
        }
    }
    namespace InsiderNotesControllerUploadFile {
        export interface RequestBody {
            file?: string; // binary
        }
        namespace Responses {
            export interface $201 {
            }
        }
    }
    namespace InsiderNotesLikesControllerCreate {
        namespace Parameters {
            export type InsiderNoteId = string;
        }
        export interface PathParameters {
            insiderNoteId: Parameters.InsiderNoteId;
        }
        namespace Responses {
            export interface $201 {
                success: boolean;
                message: string;
                data?: Components.Schemas.LikeInsiderNoteDto;
            }
        }
    }
    namespace InsiderNotesLikesControllerRemove {
        namespace Parameters {
            export type InsiderNoteId = string;
        }
        export interface PathParameters {
            insiderNoteId: Parameters.InsiderNoteId;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.LikeInsiderNoteDto;
            }
        }
    }
    namespace LikeNotesControllerCreate {
        namespace Parameters {
            export type NoteId = string;
        }
        export interface PathParameters {
            noteId: Parameters.NoteId;
        }
        namespace Responses {
            export interface $201 {
                success: boolean;
                message: string;
                data?: Components.Schemas.LikeNoteDto;
            }
        }
    }
    namespace LikeNotesControllerRemove {
        namespace Parameters {
            export type NoteId = string;
        }
        export interface PathParameters {
            noteId: Parameters.NoteId;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.LikeNoteDto;
            }
        }
    }
    namespace LikePlayersControllerCreate {
        namespace Parameters {
            export type PlayerId = string;
        }
        export interface PathParameters {
            playerId: Parameters.PlayerId;
        }
        namespace Responses {
            export interface $201 {
                success: boolean;
                message: string;
                data?: Components.Schemas.LikePlayerDto;
            }
        }
    }
    namespace LikePlayersControllerRemove {
        namespace Parameters {
            export type PlayerId = string;
        }
        export interface PathParameters {
            playerId: Parameters.PlayerId;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.LikePlayerDto;
            }
        }
    }
    namespace LikeReportsControllerCreate {
        namespace Parameters {
            export type ReportId = string;
        }
        export interface PathParameters {
            reportId: Parameters.ReportId;
        }
        namespace Responses {
            export interface $201 {
                success: boolean;
                message: string;
                data?: Components.Schemas.LikeReportDto;
            }
        }
    }
    namespace LikeReportsControllerRemove {
        namespace Parameters {
            export type ReportId = string;
        }
        export interface PathParameters {
            reportId: Parameters.ReportId;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.LikeReportDto;
            }
        }
    }
    namespace LikeTeamsControllerCreate {
        namespace Parameters {
            export type TeamId = string;
        }
        export interface PathParameters {
            teamId: Parameters.TeamId;
        }
        namespace Responses {
            export interface $201 {
                success: boolean;
                message: string;
                data?: Components.Schemas.LikeTeamDto;
            }
        }
    }
    namespace LikeTeamsControllerRemove {
        namespace Parameters {
            export type TeamId = string;
        }
        export interface PathParameters {
            teamId: Parameters.TeamId;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.LikeTeamDto;
            }
        }
    }
    namespace MatchAttendancesControllerFindActiveByUserId {
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.MatchAttendanceDto;
            }
        }
    }
    namespace MatchAttendancesControllerGoToMatch {
        namespace Parameters {
            export type MatchId = string;
        }
        export interface PathParameters {
            matchId: Parameters.MatchId;
        }
        namespace Responses {
            export interface $201 {
                success: boolean;
                message: string;
                data?: Components.Schemas.MatchAttendanceDto;
            }
        }
    }
    namespace MatchAttendancesControllerLeaveTheMatch {
        namespace Parameters {
            export type MatchId = string;
        }
        export interface PathParameters {
            matchId: Parameters.MatchId;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.MatchAttendanceDto;
            }
        }
    }
    namespace MatchesControllerCreate {
        export type RequestBody = Components.Schemas.CreateMatchDto;
        namespace Responses {
            export interface $201 {
                success: boolean;
                message: string;
                data?: Components.Schemas.MatchDto;
            }
        }
    }
    namespace MatchesControllerFindAll {
        namespace Parameters {
            export type CompetitionIds = string[];
            export type GroupIds = string[];
            export type HasVideo = boolean;
            export type Limit = number;
            export type OrderId = string;
            export type Page = number;
            export type SeasonId = string;
            export type SortBy = "id" | "date" | "homeTeam" | "awayTeam" | "competition" | "group" | "season" | "reportsCount" | "notesCount" | "videoUrl";
            export type SortingOrder = "asc" | "desc";
            export type TeamId = string;
        }
        export interface QueryParameters {
            teamId?: Parameters.TeamId;
            competitionIds?: Parameters.CompetitionIds;
            groupIds?: Parameters.GroupIds;
            seasonId?: Parameters.SeasonId;
            orderId?: Parameters.OrderId;
            hasVideo?: Parameters.HasVideo;
            sortBy?: Parameters.SortBy;
            sortingOrder?: Parameters.SortingOrder;
            limit?: Parameters.Limit;
            page?: Parameters.Page;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: {
                    totalDocs?: number;
                    limit?: number;
                    page?: number;
                    totalPages?: number;
                    hasPrevPage?: boolean;
                    hasNextPage?: boolean;
                    prevPage?: number | null;
                    nextPage?: number | null;
                    docs?: Components.Schemas.MatchDto[];
                };
            }
        }
    }
    namespace MatchesControllerFindOne {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.MatchDto;
            }
        }
    }
    namespace MatchesControllerGetList {
        namespace Parameters {
            export type CompetitionIds = string[];
            export type GroupIds = string[];
            export type HasVideo = boolean;
            export type OrderId = string;
            export type SeasonId = string;
            export type TeamId = string;
        }
        export interface QueryParameters {
            teamId?: Parameters.TeamId;
            competitionIds?: Parameters.CompetitionIds;
            groupIds?: Parameters.GroupIds;
            seasonId?: Parameters.SeasonId;
            orderId?: Parameters.OrderId;
            hasVideo?: Parameters.HasVideo;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.MatchBasicDataDto;
            }
        }
    }
    namespace MatchesControllerRemove {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.MatchDto;
            }
        }
    }
    namespace MatchesControllerUpdate {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.UpdateMatchDto;
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.MatchDto;
            }
        }
    }
    namespace MatchesControllerUploadFile {
        export interface RequestBody {
            file?: string; // binary
        }
        namespace Responses {
            export interface $201 {
            }
        }
    }
    namespace NotesControllerCreate {
        export type RequestBody = Components.Schemas.CreateNoteDto;
        namespace Responses {
            export interface $201 {
                success: boolean;
                message: string;
                data?: Components.Schemas.NoteDto;
            }
        }
    }
    namespace NotesControllerFindAll {
        namespace Parameters {
            export type CompetitionGroupIds = string[];
            export type CompetitionIds = string[];
            export type IsLiked = boolean;
            export type Limit = number;
            export type MatchIds = string[];
            export type OnlyLikedPlayers = boolean;
            export type OnlyLikedTeams = boolean;
            export type Page = number;
            export type PercentageRatingRangeEnd = number;
            export type PercentageRatingRangeStart = number;
            export type PlayerBornAfter = number;
            export type PlayerBornBefore = number;
            export type PlayerIds = string[];
            export type PositionIds = string[];
            export type SortBy = "id" | "player" | "positionPlayed" | "percentageRating" | "match" | "author" | "createdAt";
            export type SortingOrder = "asc" | "desc";
            export type TeamIds = string[];
            export type UserId = string;
        }
        export interface QueryParameters {
            playerIds?: Parameters.PlayerIds;
            positionIds?: Parameters.PositionIds;
            teamIds?: Parameters.TeamIds;
            matchIds?: Parameters.MatchIds;
            competitionIds?: Parameters.CompetitionIds;
            competitionGroupIds?: Parameters.CompetitionGroupIds;
            percentageRatingRangeStart?: Parameters.PercentageRatingRangeStart;
            percentageRatingRangeEnd?: Parameters.PercentageRatingRangeEnd;
            playerBornAfter?: Parameters.PlayerBornAfter;
            playerBornBefore?: Parameters.PlayerBornBefore;
            isLiked?: Parameters.IsLiked;
            userId?: Parameters.UserId;
            onlyLikedTeams?: Parameters.OnlyLikedTeams;
            onlyLikedPlayers?: Parameters.OnlyLikedPlayers;
            sortBy?: Parameters.SortBy;
            sortingOrder?: Parameters.SortingOrder;
            limit?: Parameters.Limit;
            page?: Parameters.Page;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: {
                    totalDocs?: number;
                    limit?: number;
                    page?: number;
                    totalPages?: number;
                    hasPrevPage?: boolean;
                    hasNextPage?: boolean;
                    prevPage?: number | null;
                    nextPage?: number | null;
                    docs?: Components.Schemas.NotePaginatedDataDto[];
                };
            }
        }
    }
    namespace NotesControllerFindOne {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.NoteDto;
            }
        }
    }
    namespace NotesControllerGetList {
        namespace Parameters {
            export type MatchIds = string[];
        }
        export interface QueryParameters {
            matchIds?: Parameters.MatchIds;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.NoteBasicDataDto;
            }
        }
    }
    namespace NotesControllerRemove {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.NoteDto;
            }
        }
    }
    namespace NotesControllerUpdate {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.UpdateNoteDto;
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.NoteDto;
            }
        }
    }
    namespace NotesControllerUploadFile {
        export interface RequestBody {
            file?: string; // binary
        }
        namespace Responses {
            export interface $201 {
            }
        }
    }
    namespace OrdersControllerAccept {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.OrderDto;
            }
        }
    }
    namespace OrdersControllerClose {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.OrderDto;
            }
        }
    }
    namespace OrdersControllerCreate {
        export type RequestBody = Components.Schemas.CreateOrderDto;
        namespace Responses {
            export interface $201 {
                success: boolean;
                message: string;
                data?: Components.Schemas.OrderDto;
            }
        }
    }
    namespace OrdersControllerFindAll {
        namespace Parameters {
            export type CreatedAfter = string;
            export type CreatedBefore = string;
            export type Limit = number;
            export type MatchIds = string[];
            export type Page = number;
            export type PlayerIds = string[];
            export type SortBy = "id" | "player" | "position" | "status" | "scout" | "description" | "createdAt";
            export type SortingOrder = "asc" | "desc";
            export type Status = "OPEN" | "ACCEPTED" | "CLOSED";
            export type TeamIds = string[];
            export type UserId = string;
        }
        export interface QueryParameters {
            userId?: Parameters.UserId;
            playerIds?: Parameters.PlayerIds;
            teamIds?: Parameters.TeamIds;
            matchIds?: Parameters.MatchIds;
            status?: Parameters.Status;
            createdAfter?: Parameters.CreatedAfter;
            createdBefore?: Parameters.CreatedBefore;
            sortBy?: Parameters.SortBy;
            sortingOrder?: Parameters.SortingOrder;
            limit?: Parameters.Limit;
            page?: Parameters.Page;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: {
                    totalDocs?: number;
                    limit?: number;
                    page?: number;
                    totalPages?: number;
                    hasPrevPage?: boolean;
                    hasNextPage?: boolean;
                    prevPage?: number | null;
                    nextPage?: number | null;
                    docs?: Components.Schemas.OrderDto[];
                };
            }
        }
    }
    namespace OrdersControllerFindOne {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.OrderDto;
            }
        }
    }
    namespace OrdersControllerGetList {
        namespace Parameters {
            export type CreatedAfter = string;
            export type CreatedBefore = string;
            export type MatchIds = string[];
            export type PlayerIds = string[];
            export type Status = "OPEN" | "ACCEPTED" | "CLOSED";
            export type TeamIds = string[];
            export type UserId = string;
        }
        export interface QueryParameters {
            userId?: Parameters.UserId;
            playerIds?: Parameters.PlayerIds;
            teamIds?: Parameters.TeamIds;
            matchIds?: Parameters.MatchIds;
            status?: Parameters.Status;
            createdAfter?: Parameters.CreatedAfter;
            createdBefore?: Parameters.CreatedBefore;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.OrderBasicDataDto;
            }
        }
    }
    namespace OrdersControllerReject {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.OrderDto;
            }
        }
    }
    namespace OrdersControllerRemove {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.OrderDto;
            }
        }
    }
    namespace OrganizationInsiderNoteAclControllerCreate {
        export type RequestBody = Components.Schemas.CreateOrganizationInsiderNoteAceDto;
        namespace Responses {
            export interface $201 {
                success: boolean;
                message: string;
                data?: Components.Schemas.OrganizationInsiderNoteAceDto;
            }
        }
    }
    namespace OrganizationInsiderNoteAclControllerFindAll {
        namespace Parameters {
            export type InsiderNoteId = string;
            export type Limit = number;
            export type OrganizationId = string;
            export type Page = number;
            export type SortBy = "id" | "organization" | "insiderNote" | "createdAt";
            export type SortingOrder = "asc" | "desc";
        }
        export interface QueryParameters {
            organizationId?: Parameters.OrganizationId;
            insiderNoteId?: Parameters.InsiderNoteId;
            sortBy?: Parameters.SortBy;
            sortingOrder?: Parameters.SortingOrder;
            limit?: Parameters.Limit;
            page?: Parameters.Page;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: {
                    totalDocs?: number;
                    limit?: number;
                    page?: number;
                    totalPages?: number;
                    hasPrevPage?: boolean;
                    hasNextPage?: boolean;
                    prevPage?: number | null;
                    nextPage?: number | null;
                    docs?: Components.Schemas.OrganizationInsiderNoteAceDto[];
                };
            }
        }
    }
    namespace OrganizationInsiderNoteAclControllerFindOne {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.OrganizationInsiderNoteAceDto;
            }
        }
    }
    namespace OrganizationInsiderNoteAclControllerRemove {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.OrganizationInsiderNoteAceDto;
            }
        }
    }
    namespace OrganizationInsiderNoteAclControllerUpdate {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.UpdateOrganizationInsiderNoteAceDto;
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.OrganizationInsiderNoteAceDto;
            }
        }
    }
    namespace OrganizationNoteAclControllerCreate {
        export type RequestBody = Components.Schemas.CreateOrganizationNoteAceDto;
        namespace Responses {
            export interface $201 {
                success: boolean;
                message: string;
                data?: Components.Schemas.OrganizationNoteAceDto;
            }
        }
    }
    namespace OrganizationNoteAclControllerFindAll {
        namespace Parameters {
            export type Limit = number;
            export type NoteId = string;
            export type OrganizationId = string;
            export type Page = number;
            export type SortBy = "id" | "organization" | "note" | "createdAt";
            export type SortingOrder = "asc" | "desc";
        }
        export interface QueryParameters {
            organizationId?: Parameters.OrganizationId;
            noteId?: Parameters.NoteId;
            sortBy?: Parameters.SortBy;
            sortingOrder?: Parameters.SortingOrder;
            limit?: Parameters.Limit;
            page?: Parameters.Page;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: {
                    totalDocs?: number;
                    limit?: number;
                    page?: number;
                    totalPages?: number;
                    hasPrevPage?: boolean;
                    hasNextPage?: boolean;
                    prevPage?: number | null;
                    nextPage?: number | null;
                    docs?: Components.Schemas.OrganizationNoteAceDto[];
                };
            }
        }
    }
    namespace OrganizationNoteAclControllerFindOne {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.OrganizationNoteAceDto;
            }
        }
    }
    namespace OrganizationNoteAclControllerRemove {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.OrganizationNoteAceDto;
            }
        }
    }
    namespace OrganizationNoteAclControllerUpdate {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.UpdateOrganizationNoteAceDto;
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.OrganizationNoteAceDto;
            }
        }
    }
    namespace OrganizationPlayerAclControllerCreate {
        export type RequestBody = Components.Schemas.CreateOrganizationPlayerAceDto;
        namespace Responses {
            export interface $201 {
                success: boolean;
                message: string;
                data?: Components.Schemas.OrganizationPlayerAceDto;
            }
        }
    }
    namespace OrganizationPlayerAclControllerFindAll {
        namespace Parameters {
            export type Limit = number;
            export type OrganizationId = string;
            export type Page = number;
            export type PlayerId = string;
            export type SortBy = "id" | "organization" | "player" | "createdAt";
            export type SortingOrder = "asc" | "desc";
        }
        export interface QueryParameters {
            organizationId?: Parameters.OrganizationId;
            playerId?: Parameters.PlayerId;
            sortBy?: Parameters.SortBy;
            sortingOrder?: Parameters.SortingOrder;
            limit?: Parameters.Limit;
            page?: Parameters.Page;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: {
                    totalDocs?: number;
                    limit?: number;
                    page?: number;
                    totalPages?: number;
                    hasPrevPage?: boolean;
                    hasNextPage?: boolean;
                    prevPage?: number | null;
                    nextPage?: number | null;
                    docs?: Components.Schemas.OrganizationPlayerAceDto[];
                };
            }
        }
    }
    namespace OrganizationPlayerAclControllerFindOne {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.OrganizationPlayerAceDto;
            }
        }
    }
    namespace OrganizationPlayerAclControllerRemove {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.OrganizationPlayerAceDto;
            }
        }
    }
    namespace OrganizationPlayerAclControllerUpdate {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.UpdateOrganizationPlayerAceDto;
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.OrganizationPlayerAceDto;
            }
        }
    }
    namespace OrganizationReportAclControllerCreate {
        export type RequestBody = Components.Schemas.CreateOrganizationReportAceDto;
        namespace Responses {
            export interface $201 {
                success: boolean;
                message: string;
                data?: Components.Schemas.OrganizationReportAceDto;
            }
        }
    }
    namespace OrganizationReportAclControllerFindAll {
        namespace Parameters {
            export type Limit = number;
            export type OrganizationId = string;
            export type Page = number;
            export type ReportId = string;
            export type SortBy = "id" | "organization" | "report" | "createdAt";
            export type SortingOrder = "asc" | "desc";
        }
        export interface QueryParameters {
            organizationId?: Parameters.OrganizationId;
            reportId?: Parameters.ReportId;
            sortBy?: Parameters.SortBy;
            sortingOrder?: Parameters.SortingOrder;
            limit?: Parameters.Limit;
            page?: Parameters.Page;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: {
                    totalDocs?: number;
                    limit?: number;
                    page?: number;
                    totalPages?: number;
                    hasPrevPage?: boolean;
                    hasNextPage?: boolean;
                    prevPage?: number | null;
                    nextPage?: number | null;
                    docs?: Components.Schemas.OrganizationReportAceDto[];
                };
            }
        }
    }
    namespace OrganizationReportAclControllerFindOne {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.OrganizationReportAceDto;
            }
        }
    }
    namespace OrganizationReportAclControllerRemove {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.OrganizationReportAceDto;
            }
        }
    }
    namespace OrganizationReportAclControllerUpdate {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.UpdateOrganizationReportAceDto;
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.OrganizationReportAceDto;
            }
        }
    }
    namespace OrganizationSubscriptionsControllerCreate {
        export type RequestBody = Components.Schemas.CreateOrganizationSubscriptionDto;
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.OrganizationSubscriptionDto;
            }
            export interface $201 {
            }
        }
    }
    namespace OrganizationSubscriptionsControllerFindAll {
        namespace Parameters {
            export type CompetitionGroupIds = string[];
            export type CompetitionIds = string[];
            export type Limit = number;
            export type OrganizationId = string;
            export type Page = number;
            export type SortBy = "id" | "organization" | "startDate" | "endDate";
            export type SortingOrder = "asc" | "desc";
        }
        export interface QueryParameters {
            organizationId?: Parameters.OrganizationId;
            competitionIds?: Parameters.CompetitionIds;
            competitionGroupIds?: Parameters.CompetitionGroupIds;
            sortBy?: Parameters.SortBy;
            sortingOrder?: Parameters.SortingOrder;
            limit?: Parameters.Limit;
            page?: Parameters.Page;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: {
                    totalDocs?: number;
                    limit?: number;
                    page?: number;
                    totalPages?: number;
                    hasPrevPage?: boolean;
                    hasNextPage?: boolean;
                    prevPage?: number | null;
                    nextPage?: number | null;
                    docs?: Components.Schemas.OrganizationSubscriptionDto[];
                };
            }
        }
    }
    namespace OrganizationSubscriptionsControllerFindOne {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.OrganizationSubscriptionDto;
            }
        }
    }
    namespace OrganizationSubscriptionsControllerRemove {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.OrganizationSubscriptionDto;
            }
        }
    }
    namespace OrganizationSubscriptionsControllerUpdate {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.UpdateOrganizationSubscriptionDto;
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.OrganizationSubscriptionDto;
            }
        }
    }
    namespace OrganizationsControllerAddMember {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.ToggleMembershipDto;
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.OrganizationDto;
            }
        }
    }
    namespace OrganizationsControllerCreate {
        export type RequestBody = Components.Schemas.CreateOrganizationDto;
        namespace Responses {
            export interface $201 {
                success: boolean;
                message: string;
                data?: Components.Schemas.OrganizationDto;
            }
        }
    }
    namespace OrganizationsControllerFindAll {
        namespace Parameters {
            export type Limit = number;
            export type Name = string;
            export type Page = number;
            export type SortBy = "id" | "name" | "createdAt";
            export type SortingOrder = "asc" | "desc";
        }
        export interface QueryParameters {
            name?: Parameters.Name;
            sortBy?: Parameters.SortBy;
            sortingOrder?: Parameters.SortingOrder;
            limit?: Parameters.Limit;
            page?: Parameters.Page;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: {
                    totalDocs?: number;
                    limit?: number;
                    page?: number;
                    totalPages?: number;
                    hasPrevPage?: boolean;
                    hasNextPage?: boolean;
                    prevPage?: number | null;
                    nextPage?: number | null;
                    docs?: Components.Schemas.OrganizationDto[];
                };
            }
        }
    }
    namespace OrganizationsControllerFindOne {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.OrganizationDto;
            }
        }
    }
    namespace OrganizationsControllerGetList {
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.OrganizationDto;
            }
        }
    }
    namespace OrganizationsControllerRemove {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.OrganizationDto;
            }
        }
    }
    namespace OrganizationsControllerRemoveMember {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.ToggleMembershipDto;
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.OrganizationDto;
            }
        }
    }
    namespace OrganizationsControllerUpdate {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.UpdateOrganizationDto;
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.OrganizationDto;
            }
        }
    }
    namespace OrganizationsControllerUploadFile {
        export interface RequestBody {
            file?: string; // binary
        }
        namespace Responses {
            export interface $201 {
            }
        }
    }
    namespace PlayerPositionsControllerCreate {
        export type RequestBody = Components.Schemas.CreatePlayerPositionDto;
        namespace Responses {
            export interface $201 {
                success: boolean;
                message: string;
                data?: Components.Schemas.PlayerPositionDto;
            }
        }
    }
    namespace PlayerPositionsControllerFindAll {
        namespace Parameters {
            export type Code = string;
            export type Limit = number;
            export type Name = string;
            export type Page = number;
            export type SortBy = "id" | "name" | "code";
            export type SortingOrder = "asc" | "desc";
        }
        export interface QueryParameters {
            name?: Parameters.Name;
            code?: Parameters.Code;
            sortBy?: Parameters.SortBy;
            sortingOrder?: Parameters.SortingOrder;
            limit?: Parameters.Limit;
            page?: Parameters.Page;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: {
                    totalDocs?: number;
                    limit?: number;
                    page?: number;
                    totalPages?: number;
                    hasPrevPage?: boolean;
                    hasNextPage?: boolean;
                    prevPage?: number | null;
                    nextPage?: number | null;
                    docs?: Components.Schemas.PlayerPositionDto[];
                };
            }
        }
    }
    namespace PlayerPositionsControllerFindOne {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.PlayerPositionDto;
            }
        }
    }
    namespace PlayerPositionsControllerGetList {
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.PlayerPositionDto[];
            }
        }
    }
    namespace PlayerPositionsControllerRemove {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.PlayerPositionDto;
            }
        }
    }
    namespace PlayerPositionsControllerUpdate {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.UpdatePlayerPositionDto;
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.PlayerPositionDto;
            }
        }
    }
    namespace PlayerPositionsControllerUploadFile {
        export interface RequestBody {
            file?: string; // binary
        }
        namespace Responses {
            export interface $201 {
            }
        }
    }
    namespace PlayerStatsControllerCreate {
        export type RequestBody = Components.Schemas.CreatePlayerStatsDto;
        namespace Responses {
            export interface $201 {
                success: boolean;
                message: string;
                data?: Components.Schemas.PlayerStatsDto;
            }
        }
    }
    namespace PlayerStatsControllerFindAll {
        namespace Parameters {
            export type Limit = number;
            export type MatchId = string;
            export type Page = number;
            export type PlayerId = string;
            export type SortBy = "id" | "player" | "match" | "goals" | "assists" | "minutesPlayed" | "yellowCards" | "redCards";
            export type SortingOrder = "asc" | "desc";
            export type TeamId = string;
        }
        export interface QueryParameters {
            playerId?: Parameters.PlayerId;
            teamId?: Parameters.TeamId;
            matchId?: Parameters.MatchId;
            sortBy?: Parameters.SortBy;
            sortingOrder?: Parameters.SortingOrder;
            limit?: Parameters.Limit;
            page?: Parameters.Page;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: {
                    totalDocs?: number;
                    limit?: number;
                    page?: number;
                    totalPages?: number;
                    hasPrevPage?: boolean;
                    hasNextPage?: boolean;
                    prevPage?: number | null;
                    nextPage?: number | null;
                    docs?: Components.Schemas.PlayerStatsDto[];
                };
            }
        }
    }
    namespace PlayerStatsControllerFindOne {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.PlayerStatsDto;
            }
        }
    }
    namespace PlayerStatsControllerRemove {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.PlayerStatsDto;
            }
        }
    }
    namespace PlayerStatsControllerUpdate {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.UpdatePlayerStatsDto;
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.PlayerStatsDto;
            }
        }
    }
    namespace PlayersControllerCreate {
        export type RequestBody = Components.Schemas.CreatePlayerDto;
        namespace Responses {
            export interface $201 {
                success: boolean;
                message: string;
                data?: Components.Schemas.PlayerDto;
            }
        }
    }
    namespace PlayersControllerFindAll {
        namespace Parameters {
            export type BornAfter = number;
            export type BornBefore = number;
            export type CompetitionGroupIds = string[];
            export type CompetitionIds = string[];
            export type CountryIds = string[];
            export type Footed = "LEFT" | "RIGHT" | "BOTH";
            export type HasAnyObservation = boolean;
            export type HasNote = boolean;
            export type HasReport = boolean;
            export type IsLiked = boolean;
            export type Limit = number;
            export type Name = string;
            export type OrderId = string;
            export type Page = number;
            export type PositionIds = string[];
            export type SortBy = "id" | "firstName" | "lastName" | "yearOfBirth" | "height" | "weight" | "footed" | "country" | "primaryPosition" | "reportsCount" | "notesCount";
            export type SortingOrder = "asc" | "desc";
            export type TeamIds = string[];
        }
        export interface QueryParameters {
            name?: Parameters.Name;
            bornAfter?: Parameters.BornAfter;
            bornBefore?: Parameters.BornBefore;
            footed?: Parameters.Footed;
            countryIds?: Parameters.CountryIds;
            positionIds?: Parameters.PositionIds;
            teamIds?: Parameters.TeamIds;
            competitionIds?: Parameters.CompetitionIds;
            competitionGroupIds?: Parameters.CompetitionGroupIds;
            orderId?: Parameters.OrderId;
            isLiked?: Parameters.IsLiked;
            hasNote?: Parameters.HasNote;
            hasReport?: Parameters.HasReport;
            hasAnyObservation?: Parameters.HasAnyObservation;
            sortBy?: Parameters.SortBy;
            sortingOrder?: Parameters.SortingOrder;
            limit?: Parameters.Limit;
            page?: Parameters.Page;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: {
                    totalDocs?: number;
                    limit?: number;
                    page?: number;
                    totalPages?: number;
                    hasPrevPage?: boolean;
                    hasNextPage?: boolean;
                    prevPage?: number | null;
                    nextPage?: number | null;
                    docs?: Components.Schemas.PlayerDto[];
                };
            }
        }
    }
    namespace PlayersControllerFindOne {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.PlayerDto;
            }
        }
    }
    namespace PlayersControllerFindOneBySlug {
        namespace Parameters {
            export type Slug = string;
        }
        export interface PathParameters {
            slug: Parameters.Slug;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.PlayerDto;
            }
        }
    }
    namespace PlayersControllerGetList {
        namespace Parameters {
            export type BornAfter = number;
            export type BornBefore = number;
            export type CompetitionGroupIds = string[];
            export type CompetitionIds = string[];
            export type CountryIds = string[];
            export type Footed = "LEFT" | "RIGHT" | "BOTH";
            export type HasAnyObservation = boolean;
            export type HasNote = boolean;
            export type HasReport = boolean;
            export type IsLiked = boolean;
            export type Name = string;
            export type OrderId = string;
            export type PositionIds = string[];
            export type TeamIds = string[];
        }
        export interface QueryParameters {
            name?: Parameters.Name;
            bornAfter?: Parameters.BornAfter;
            bornBefore?: Parameters.BornBefore;
            footed?: Parameters.Footed;
            countryIds?: Parameters.CountryIds;
            positionIds?: Parameters.PositionIds;
            teamIds?: Parameters.TeamIds;
            competitionIds?: Parameters.CompetitionIds;
            competitionGroupIds?: Parameters.CompetitionGroupIds;
            orderId?: Parameters.OrderId;
            isLiked?: Parameters.IsLiked;
            hasNote?: Parameters.HasNote;
            hasReport?: Parameters.HasReport;
            hasAnyObservation?: Parameters.HasAnyObservation;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.PlayerBasicDataDto;
            }
        }
    }
    namespace PlayersControllerRemove {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.PlayerDto;
            }
        }
    }
    namespace PlayersControllerUpdate {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.UpdatePlayerDto;
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.PlayerDto;
            }
        }
    }
    namespace PlayersControllerUploadFile {
        export interface RequestBody {
            file?: string; // binary
        }
        namespace Responses {
            export interface $201 {
            }
        }
    }
    namespace RegionsControllerCreate {
        export type RequestBody = Components.Schemas.CreateRegionDto;
        namespace Responses {
            export interface $201 {
                success: boolean;
                message: string;
                data?: Components.Schemas.RegionDto;
            }
        }
    }
    namespace RegionsControllerFindAll {
        namespace Parameters {
            export type CountryId = string;
            export type Limit = number;
            export type Name = string;
            export type Page = number;
            export type SortBy = "id" | "name" | "countryId";
            export type SortingOrder = "asc" | "desc";
        }
        export interface QueryParameters {
            name?: Parameters.Name;
            countryId?: Parameters.CountryId;
            sortBy?: Parameters.SortBy;
            sortingOrder?: Parameters.SortingOrder;
            limit?: Parameters.Limit;
            page?: Parameters.Page;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: {
                    totalDocs?: number;
                    limit?: number;
                    page?: number;
                    totalPages?: number;
                    hasPrevPage?: boolean;
                    hasNextPage?: boolean;
                    prevPage?: number | null;
                    nextPage?: number | null;
                    docs?: Components.Schemas.RegionDto[];
                };
            }
        }
    }
    namespace RegionsControllerFindOne {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.RegionDto;
            }
        }
    }
    namespace RegionsControllerGetList {
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.RegionDto[];
            }
        }
    }
    namespace RegionsControllerRemove {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.RegionDto;
            }
        }
    }
    namespace RegionsControllerUpdate {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.UpdateRegionDto;
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.RegionDto;
            }
        }
    }
    namespace RegionsControllerUploadFile {
        export interface RequestBody {
            file?: string; // binary
        }
        namespace Responses {
            export interface $201 {
            }
        }
    }
    namespace ReportBackgroundImagesControllerCreate {
        export type RequestBody = Components.Schemas.CreateReportBackgroundImageDto;
        namespace Responses {
            export interface $201 {
                success: boolean;
                message: string;
                data?: Components.Schemas.ReportBackgroundImageDto;
            }
        }
    }
    namespace ReportBackgroundImagesControllerFindAll {
        namespace Parameters {
            export type Limit = number;
            export type Name = string;
            export type Page = number;
            export type SortBy = "id" | "name";
            export type SortingOrder = "asc" | "desc";
        }
        export interface QueryParameters {
            name?: Parameters.Name;
            sortBy?: Parameters.SortBy;
            sortingOrder?: Parameters.SortingOrder;
            limit?: Parameters.Limit;
            page?: Parameters.Page;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: {
                    totalDocs?: number;
                    limit?: number;
                    page?: number;
                    totalPages?: number;
                    hasPrevPage?: boolean;
                    hasNextPage?: boolean;
                    prevPage?: number | null;
                    nextPage?: number | null;
                    docs?: Components.Schemas.ReportBackgroundImageDto[];
                };
            }
        }
    }
    namespace ReportBackgroundImagesControllerFindOne {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.ReportBackgroundImageDto;
            }
        }
    }
    namespace ReportBackgroundImagesControllerGetList {
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.ReportBackgroundImageDto;
            }
        }
    }
    namespace ReportBackgroundImagesControllerRemove {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.ReportBackgroundImageDto;
            }
        }
    }
    namespace ReportBackgroundImagesControllerUpdate {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.UpdateReportBackgroundImageDto;
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.ReportBackgroundImageDto;
            }
        }
    }
    namespace ReportSkillAssessmentCategoriesControllerCreate {
        export type RequestBody = Components.Schemas.CreateReportSkillAssessmentCategoryDto;
        namespace Responses {
            export interface $201 {
                success: boolean;
                message: string;
                data?: Components.Schemas.ReportSkillAssessmentCategoryDto;
            }
        }
    }
    namespace ReportSkillAssessmentCategoriesControllerFindAll {
        namespace Parameters {
            export type Limit = number;
            export type Name = string;
            export type Page = number;
            export type SortBy = "id" | "name";
            export type SortingOrder = "asc" | "desc";
        }
        export interface QueryParameters {
            name?: Parameters.Name;
            sortBy?: Parameters.SortBy;
            sortingOrder?: Parameters.SortingOrder;
            limit?: Parameters.Limit;
            page?: Parameters.Page;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: {
                    totalDocs?: number;
                    limit?: number;
                    page?: number;
                    totalPages?: number;
                    hasPrevPage?: boolean;
                    hasNextPage?: boolean;
                    prevPage?: number | null;
                    nextPage?: number | null;
                    docs?: Components.Schemas.ReportSkillAssessmentCategoryDto[];
                };
            }
        }
    }
    namespace ReportSkillAssessmentCategoriesControllerFindOne {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.ReportSkillAssessmentCategoryDto;
            }
        }
    }
    namespace ReportSkillAssessmentCategoriesControllerGetList {
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.ReportSkillAssessmentCategoryDto;
            }
        }
    }
    namespace ReportSkillAssessmentCategoriesControllerRemove {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.ReportSkillAssessmentCategoryDto;
            }
        }
    }
    namespace ReportSkillAssessmentCategoriesControllerUpdate {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.UpdateReportSkillAssessmentCategoryDto;
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.ReportSkillAssessmentCategoryDto;
            }
        }
    }
    namespace ReportSkillAssessmentCategoriesControllerUploadFile {
        export interface RequestBody {
            file?: string; // binary
        }
        namespace Responses {
            export interface $201 {
            }
        }
    }
    namespace ReportSkillAssessmentTemplatesControllerCreate {
        export type RequestBody = Components.Schemas.CreateReportSkillAssessmentTemplateDto;
        namespace Responses {
            export interface $201 {
                success: boolean;
                message: string;
                data?: Components.Schemas.ReportSkillAssessmentTemplateDto;
            }
        }
    }
    namespace ReportSkillAssessmentTemplatesControllerFindAll {
        namespace Parameters {
            export type CategoryIds = string[];
            export type Limit = number;
            export type Name = string;
            export type Page = number;
            export type SortBy = "id" | "name" | "category";
            export type SortingOrder = "asc" | "desc";
        }
        export interface QueryParameters {
            name?: Parameters.Name;
            categoryIds?: Parameters.CategoryIds;
            sortBy?: Parameters.SortBy;
            sortingOrder?: Parameters.SortingOrder;
            limit?: Parameters.Limit;
            page?: Parameters.Page;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: {
                    totalDocs?: number;
                    limit?: number;
                    page?: number;
                    totalPages?: number;
                    hasPrevPage?: boolean;
                    hasNextPage?: boolean;
                    prevPage?: number | null;
                    nextPage?: number | null;
                    docs?: Components.Schemas.ReportSkillAssessmentTemplateDto[];
                };
            }
        }
    }
    namespace ReportSkillAssessmentTemplatesControllerFindOne {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.ReportSkillAssessmentTemplateDto;
            }
        }
    }
    namespace ReportSkillAssessmentTemplatesControllerGetList {
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.ReportSkillAssessmentTemplateDto;
            }
        }
    }
    namespace ReportSkillAssessmentTemplatesControllerRemove {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.ReportSkillAssessmentTemplateDto;
            }
        }
    }
    namespace ReportSkillAssessmentTemplatesControllerUpdate {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.UpdateReportSkillAssessmentTemplateDto;
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.ReportSkillAssessmentTemplateDto;
            }
        }
    }
    namespace ReportSkillAssessmentTemplatesControllerUploadFile {
        export interface RequestBody {
            file?: string; // binary
        }
        namespace Responses {
            export interface $201 {
            }
        }
    }
    namespace ReportSkillAssessmentsControllerFindAll {
        namespace Parameters {
            export type Limit = number;
            export type MatchId = string;
            export type Page = number;
            export type PlayerId = string;
            export type SortBy = "id" | "rating" | "player" | "match";
            export type SortingOrder = "asc" | "desc";
        }
        export interface QueryParameters {
            playerId?: Parameters.PlayerId;
            matchId?: Parameters.MatchId;
            sortBy?: Parameters.SortBy;
            sortingOrder?: Parameters.SortingOrder;
            limit?: Parameters.Limit;
            page?: Parameters.Page;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: {
                    totalDocs?: number;
                    limit?: number;
                    page?: number;
                    totalPages?: number;
                    hasPrevPage?: boolean;
                    hasNextPage?: boolean;
                    prevPage?: number | null;
                    nextPage?: number | null;
                    docs?: Components.Schemas.ReportSkillAssessmentDto[];
                };
            }
        }
    }
    namespace ReportTemplatesControllerCreate {
        export type RequestBody = Components.Schemas.CreateReportTemplateDto;
        namespace Responses {
            export interface $201 {
                success: boolean;
                message: string;
                data?: Components.Schemas.ReportTemplateDto;
            }
        }
    }
    namespace ReportTemplatesControllerFindAll {
        namespace Parameters {
            export type Limit = number;
            export type Name = string;
            export type Page = number;
            export type SortBy = "id" | "name";
            export type SortingOrder = "asc" | "desc";
        }
        export interface QueryParameters {
            name?: Parameters.Name;
            sortBy?: Parameters.SortBy;
            sortingOrder?: Parameters.SortingOrder;
            limit?: Parameters.Limit;
            page?: Parameters.Page;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: {
                    totalDocs?: number;
                    limit?: number;
                    page?: number;
                    totalPages?: number;
                    hasPrevPage?: boolean;
                    hasNextPage?: boolean;
                    prevPage?: number | null;
                    nextPage?: number | null;
                    docs?: Components.Schemas.ReportTemplateDto[];
                };
            }
        }
    }
    namespace ReportTemplatesControllerFindOne {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.ReportTemplateDto;
            }
        }
    }
    namespace ReportTemplatesControllerGetList {
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.ReportTemplateBasicDataDto;
            }
        }
    }
    namespace ReportTemplatesControllerRemove {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.ReportTemplateDto;
            }
        }
    }
    namespace ReportTemplatesControllerUpdate {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.UpdateReportTemplateDto;
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.ReportTemplateDto;
            }
        }
    }
    namespace ReportTemplatesControllerUploadFile {
        export interface RequestBody {
            file?: string; // binary
        }
        namespace Responses {
            export interface $201 {
            }
        }
    }
    namespace ReportsControllerCreate {
        export type RequestBody = Components.Schemas.CreateReportDto;
        namespace Responses {
            export interface $201 {
                success: boolean;
                message: string;
                data?: Components.Schemas.ReportDto;
            }
        }
    }
    namespace ReportsControllerFindAll {
        namespace Parameters {
            export type CompetitionGroupIds = string[];
            export type CompetitionIds = string[];
            export type HasVideo = boolean;
            export type IsLiked = boolean;
            export type Limit = number;
            export type MatchIds = string[];
            export type OnlyLikedPlayers = boolean;
            export type OnlyLikedTeams = boolean;
            export type Page = number;
            export type PercentageRatingRangeEnd = number;
            export type PercentageRatingRangeStart = number;
            export type PlayerBornAfter = number;
            export type PlayerBornBefore = number;
            export type PlayerIds = string[];
            export type PositionIds = string[];
            export type SortBy = "id" | "player" | "positionPlayed" | "finalRating" | "percentageRating" | "videoUrl" | "author" | "createdAt" | "status";
            export type SortingOrder = "asc" | "desc";
            export type TeamIds = string[];
            export type UserId = string;
        }
        export interface QueryParameters {
            playerIds?: Parameters.PlayerIds;
            positionIds?: Parameters.PositionIds;
            matchIds?: Parameters.MatchIds;
            teamIds?: Parameters.TeamIds;
            competitionIds?: Parameters.CompetitionIds;
            competitionGroupIds?: Parameters.CompetitionGroupIds;
            percentageRatingRangeStart?: Parameters.PercentageRatingRangeStart;
            percentageRatingRangeEnd?: Parameters.PercentageRatingRangeEnd;
            playerBornAfter?: Parameters.PlayerBornAfter;
            playerBornBefore?: Parameters.PlayerBornBefore;
            hasVideo?: Parameters.HasVideo;
            isLiked?: Parameters.IsLiked;
            userId?: Parameters.UserId;
            onlyLikedTeams?: Parameters.OnlyLikedTeams;
            onlyLikedPlayers?: Parameters.OnlyLikedPlayers;
            sortBy?: Parameters.SortBy;
            sortingOrder?: Parameters.SortingOrder;
            limit?: Parameters.Limit;
            page?: Parameters.Page;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: {
                    totalDocs?: number;
                    limit?: number;
                    page?: number;
                    totalPages?: number;
                    hasPrevPage?: boolean;
                    hasNextPage?: boolean;
                    prevPage?: number | null;
                    nextPage?: number | null;
                    docs?: Components.Schemas.ReportPaginatedDataDto[];
                };
            }
        }
    }
    namespace ReportsControllerFindOne {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.ReportDto;
            }
        }
    }
    namespace ReportsControllerGetList {
        namespace Parameters {
            export type CompetitionGroupIds = string[];
            export type CompetitionIds = string[];
            export type HasVideo = boolean;
            export type IsLiked = boolean;
            export type MatchIds = string[];
            export type OnlyLikedPlayers = boolean;
            export type OnlyLikedTeams = boolean;
            export type PercentageRatingRangeEnd = number;
            export type PercentageRatingRangeStart = number;
            export type PlayerBornAfter = number;
            export type PlayerBornBefore = number;
            export type PlayerIds = string[];
            export type PositionIds = string[];
            export type TeamIds = string[];
            export type UserId = string;
        }
        export interface QueryParameters {
            playerIds?: Parameters.PlayerIds;
            positionIds?: Parameters.PositionIds;
            matchIds?: Parameters.MatchIds;
            teamIds?: Parameters.TeamIds;
            competitionIds?: Parameters.CompetitionIds;
            competitionGroupIds?: Parameters.CompetitionGroupIds;
            percentageRatingRangeStart?: Parameters.PercentageRatingRangeStart;
            percentageRatingRangeEnd?: Parameters.PercentageRatingRangeEnd;
            playerBornAfter?: Parameters.PlayerBornAfter;
            playerBornBefore?: Parameters.PlayerBornBefore;
            hasVideo?: Parameters.HasVideo;
            isLiked?: Parameters.IsLiked;
            userId?: Parameters.UserId;
            onlyLikedTeams?: Parameters.OnlyLikedTeams;
            onlyLikedPlayers?: Parameters.OnlyLikedPlayers;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.ReportBasicDataDto;
            }
        }
    }
    namespace ReportsControllerRemove {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.ReportDto;
            }
        }
    }
    namespace ReportsControllerUpdate {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.UpdateReportDto;
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.ReportDto;
            }
        }
    }
    namespace ReportsControllerUploadFile {
        export interface RequestBody {
            file?: string; // binary
        }
        namespace Responses {
            export interface $201 {
            }
        }
    }
    namespace SeasonsControllerCreate {
        export type RequestBody = Components.Schemas.CreateSeasonDto;
        namespace Responses {
            export interface $201 {
                success: boolean;
                message: string;
                data?: Components.Schemas.SeasonDto;
            }
        }
    }
    namespace SeasonsControllerFindAll {
        namespace Parameters {
            export type Limit = number;
            export type Name = string;
            export type Page = number;
            export type SortBy = "id" | "name" | "isActive" | "startDate" | "endDate";
            export type SortingOrder = "asc" | "desc";
        }
        export interface QueryParameters {
            name?: Parameters.Name;
            sortBy?: Parameters.SortBy;
            sortingOrder?: Parameters.SortingOrder;
            limit?: Parameters.Limit;
            page?: Parameters.Page;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: {
                    totalDocs?: number;
                    limit?: number;
                    page?: number;
                    totalPages?: number;
                    hasPrevPage?: boolean;
                    hasNextPage?: boolean;
                    prevPage?: number | null;
                    nextPage?: number | null;
                    docs?: Components.Schemas.SeasonDto[];
                };
            }
        }
    }
    namespace SeasonsControllerFindOne {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.SeasonDto;
            }
        }
    }
    namespace SeasonsControllerGetList {
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.SeasonDto;
            }
        }
    }
    namespace SeasonsControllerRemove {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.SeasonDto;
            }
        }
    }
    namespace SeasonsControllerToggleIsActive {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.ToggleIsActiveDto;
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.SeasonDto;
            }
        }
    }
    namespace SeasonsControllerUpdate {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.UpdateSeasonDto;
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.SeasonDto;
            }
        }
    }
    namespace SeasonsControllerUploadFile {
        export interface RequestBody {
            file?: string; // binary
        }
        namespace Responses {
            export interface $201 {
            }
        }
    }
    namespace TeamAffiliationsControllerCreate {
        export type RequestBody = Components.Schemas.CreateTeamAffiliationDto;
        namespace Responses {
            export interface $201 {
                success: boolean;
                message: string;
                data?: Components.Schemas.TeamAffiliationDto;
            }
        }
    }
    namespace TeamAffiliationsControllerFindAll {
        namespace Parameters {
            export type Limit = number;
            export type Page = number;
            export type PlayerId = string;
            export type SortBy = "id" | "teamId" | "playerId" | "startDate" | "endDate";
            export type SortingOrder = "asc" | "desc";
            export type TeamId = string;
        }
        export interface QueryParameters {
            playerId?: Parameters.PlayerId;
            teamId?: Parameters.TeamId;
            sortBy?: Parameters.SortBy;
            sortingOrder?: Parameters.SortingOrder;
            limit?: Parameters.Limit;
            page?: Parameters.Page;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: {
                    totalDocs?: number;
                    limit?: number;
                    page?: number;
                    totalPages?: number;
                    hasPrevPage?: boolean;
                    hasNextPage?: boolean;
                    prevPage?: number | null;
                    nextPage?: number | null;
                    docs?: Components.Schemas.TeamAffiliationDto[];
                };
            }
        }
    }
    namespace TeamAffiliationsControllerFindOne {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.TeamAffiliationDto;
            }
        }
    }
    namespace TeamAffiliationsControllerGetList {
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.TeamAffiliationDto;
            }
        }
    }
    namespace TeamAffiliationsControllerRemove {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.TeamAffiliationDto;
            }
        }
    }
    namespace TeamAffiliationsControllerUpdate {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.UpdateTeamAffiliationDto;
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.TeamAffiliationDto;
            }
        }
    }
    namespace TeamAffiliationsControllerUploadFile {
        export interface RequestBody {
            file?: string; // binary
        }
        namespace Responses {
            export interface $201 {
            }
        }
    }
    namespace TeamsControllerCreate {
        export type RequestBody = Components.Schemas.CreateTeamDto;
        namespace Responses {
            export interface $201 {
                success: boolean;
                message: string;
                data?: Components.Schemas.TeamDto;
            }
        }
    }
    namespace TeamsControllerFindAll {
        namespace Parameters {
            export type ClubId = string;
            export type CompetitionGroupIds = string[];
            export type CompetitionIds = string[];
            export type CountryIds = string[];
            export type IsLiked = boolean;
            export type Limit = number;
            export type Name = string;
            export type Page = number;
            export type RegionIds = string[];
            export type SortBy = "id" | "name" | "clubId" | "countryId" | "regionId";
            export type SortingOrder = "asc" | "desc";
        }
        export interface QueryParameters {
            name?: Parameters.Name;
            clubId?: Parameters.ClubId;
            regionIds?: Parameters.RegionIds;
            countryIds?: Parameters.CountryIds;
            competitionIds?: Parameters.CompetitionIds;
            competitionGroupIds?: Parameters.CompetitionGroupIds;
            isLiked?: Parameters.IsLiked;
            sortBy?: Parameters.SortBy;
            sortingOrder?: Parameters.SortingOrder;
            limit?: Parameters.Limit;
            page?: Parameters.Page;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: {
                    totalDocs?: number;
                    limit?: number;
                    page?: number;
                    totalPages?: number;
                    hasPrevPage?: boolean;
                    hasNextPage?: boolean;
                    prevPage?: number | null;
                    nextPage?: number | null;
                    docs?: Components.Schemas.TeamDto[];
                };
            }
        }
    }
    namespace TeamsControllerFindOne {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.TeamDto;
            }
        }
    }
    namespace TeamsControllerFindOneBySlug {
        namespace Parameters {
            export type Slug = string;
        }
        export interface PathParameters {
            slug: Parameters.Slug;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.TeamDto;
            }
        }
    }
    namespace TeamsControllerGetList {
        namespace Parameters {
            export type ClubId = string;
            export type CompetitionGroupIds = string[];
            export type CompetitionIds = string[];
            export type CountryIds = string[];
            export type IsLiked = boolean;
            export type Name = string;
            export type RegionIds = string[];
        }
        export interface QueryParameters {
            name?: Parameters.Name;
            clubId?: Parameters.ClubId;
            regionIds?: Parameters.RegionIds;
            countryIds?: Parameters.CountryIds;
            competitionIds?: Parameters.CompetitionIds;
            competitionGroupIds?: Parameters.CompetitionGroupIds;
            isLiked?: Parameters.IsLiked;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.TeamBasicDataDto;
            }
        }
    }
    namespace TeamsControllerRemove {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.TeamDto;
            }
        }
    }
    namespace TeamsControllerUpdate {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.UpdateTeamDto;
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.TeamDto;
            }
        }
    }
    namespace TeamsControllerUploadFile {
        export interface RequestBody {
            file?: string; // binary
        }
        namespace Responses {
            export interface $201 {
            }
        }
    }
    namespace UserFootballRolesControllerCreate {
        export type RequestBody = Components.Schemas.CreateUserFootballRoleDto;
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.UserFootballRoleDto;
            }
            export interface $201 {
            }
        }
    }
    namespace UserFootballRolesControllerFindAll {
        namespace Parameters {
            export type Limit = number;
            export type Name = string;
            export type Page = number;
            export type SortBy = "id" | "name";
            export type SortingOrder = "asc" | "desc";
        }
        export interface QueryParameters {
            name?: Parameters.Name;
            sortBy?: Parameters.SortBy;
            sortingOrder?: Parameters.SortingOrder;
            limit?: Parameters.Limit;
            page?: Parameters.Page;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: {
                    totalDocs?: number;
                    limit?: number;
                    page?: number;
                    totalPages?: number;
                    hasPrevPage?: boolean;
                    hasNextPage?: boolean;
                    prevPage?: number | null;
                    nextPage?: number | null;
                    docs?: Components.Schemas.UserFootballRoleDto[];
                };
            }
        }
    }
    namespace UserFootballRolesControllerFindOne {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.UserFootballRoleDto;
            }
        }
    }
    namespace UserFootballRolesControllerGetList {
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.UserFootballRoleDto;
            }
        }
    }
    namespace UserFootballRolesControllerRemove {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.UserFootballRoleDto;
            }
        }
    }
    namespace UserFootballRolesControllerUpdate {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.UpdateUserFootballRoleDto;
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.UserFootballRoleDto;
            }
        }
    }
    namespace UserFootballRolesControllerUploadFile {
        export interface RequestBody {
            file?: string; // binary
        }
        namespace Responses {
            export interface $201 {
            }
        }
    }
    namespace UserInsiderNoteAclControllerCreate {
        export type RequestBody = Components.Schemas.CreateUserInsiderNoteAceDto;
        namespace Responses {
            export interface $201 {
                success: boolean;
                message: string;
                data?: Components.Schemas.UserInsiderNoteAceDto;
            }
        }
    }
    namespace UserInsiderNoteAclControllerFindAll {
        namespace Parameters {
            export type InsiderNoteId = string;
            export type Limit = number;
            export type Page = number;
            export type SortBy = "id" | "user" | "insiderNote" | "createdAt";
            export type SortingOrder = "asc" | "desc";
            export type UserId = string;
        }
        export interface QueryParameters {
            userId?: Parameters.UserId;
            insiderNoteId?: Parameters.InsiderNoteId;
            sortBy?: Parameters.SortBy;
            sortingOrder?: Parameters.SortingOrder;
            limit?: Parameters.Limit;
            page?: Parameters.Page;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: {
                    totalDocs?: number;
                    limit?: number;
                    page?: number;
                    totalPages?: number;
                    hasPrevPage?: boolean;
                    hasNextPage?: boolean;
                    prevPage?: number | null;
                    nextPage?: number | null;
                    docs?: Components.Schemas.UserInsiderNoteAceDto[];
                };
            }
        }
    }
    namespace UserInsiderNoteAclControllerFindOne {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.UserInsiderNoteAceDto;
            }
        }
    }
    namespace UserInsiderNoteAclControllerRemove {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.UserInsiderNoteAceDto;
            }
        }
    }
    namespace UserInsiderNoteAclControllerUpdate {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.UpdateUserInsiderNoteAceDto;
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.UserInsiderNoteAceDto;
            }
        }
    }
    namespace UserNoteAclControllerCreate {
        export type RequestBody = Components.Schemas.CreateUserNoteAceDto;
        namespace Responses {
            export interface $201 {
                success: boolean;
                message: string;
                data?: Components.Schemas.UserNoteAceDto;
            }
        }
    }
    namespace UserNoteAclControllerFindAll {
        namespace Parameters {
            export type Limit = number;
            export type NoteId = string;
            export type Page = number;
            export type SortBy = "id" | "user" | "note" | "createdAt";
            export type SortingOrder = "asc" | "desc";
            export type UserId = string;
        }
        export interface QueryParameters {
            userId?: Parameters.UserId;
            noteId?: Parameters.NoteId;
            sortBy?: Parameters.SortBy;
            sortingOrder?: Parameters.SortingOrder;
            limit?: Parameters.Limit;
            page?: Parameters.Page;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: {
                    totalDocs?: number;
                    limit?: number;
                    page?: number;
                    totalPages?: number;
                    hasPrevPage?: boolean;
                    hasNextPage?: boolean;
                    prevPage?: number | null;
                    nextPage?: number | null;
                    docs?: Components.Schemas.UserNoteAceDto[];
                };
            }
        }
    }
    namespace UserNoteAclControllerFindOne {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.UserNoteAceDto;
            }
        }
    }
    namespace UserNoteAclControllerRemove {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.UserNoteAceDto;
            }
        }
    }
    namespace UserNoteAclControllerUpdate {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.UpdateUserNoteAceDto;
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.UserNoteAceDto;
            }
        }
    }
    namespace UserPlayerAclControllerCreate {
        export type RequestBody = Components.Schemas.CreateUserPlayerAceDto;
        namespace Responses {
            export interface $201 {
                success: boolean;
                message: string;
                data?: Components.Schemas.UserPlayerAceDto;
            }
        }
    }
    namespace UserPlayerAclControllerFindAll {
        namespace Parameters {
            export type Limit = number;
            export type Page = number;
            export type PlayerId = string;
            export type SortBy = "id" | "user" | "player" | "createdAt";
            export type SortingOrder = "asc" | "desc";
            export type UserId = string;
        }
        export interface QueryParameters {
            userId?: Parameters.UserId;
            playerId?: Parameters.PlayerId;
            sortBy?: Parameters.SortBy;
            sortingOrder?: Parameters.SortingOrder;
            limit?: Parameters.Limit;
            page?: Parameters.Page;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: {
                    totalDocs?: number;
                    limit?: number;
                    page?: number;
                    totalPages?: number;
                    hasPrevPage?: boolean;
                    hasNextPage?: boolean;
                    prevPage?: number | null;
                    nextPage?: number | null;
                    docs?: Components.Schemas.UserPlayerAceDto[];
                };
            }
        }
    }
    namespace UserPlayerAclControllerFindOne {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.UserPlayerAceDto;
            }
        }
    }
    namespace UserPlayerAclControllerRemove {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.UserPlayerAceDto;
            }
        }
    }
    namespace UserPlayerAclControllerUpdate {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.UpdateUserPlayerAceDto;
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.UserPlayerAceDto;
            }
        }
    }
    namespace UserReportAclControllerCreate {
        export type RequestBody = Components.Schemas.CreateUserReportAceDto;
        namespace Responses {
            export interface $201 {
                success: boolean;
                message: string;
                data?: Components.Schemas.UserReportAceDto;
            }
        }
    }
    namespace UserReportAclControllerFindAll {
        namespace Parameters {
            export type Limit = number;
            export type Page = number;
            export type ReportId = string;
            export type SortBy = "id" | "user" | "report" | "createdAt";
            export type SortingOrder = "asc" | "desc";
            export type UserId = string;
        }
        export interface QueryParameters {
            userId?: Parameters.UserId;
            reportId?: Parameters.ReportId;
            sortBy?: Parameters.SortBy;
            sortingOrder?: Parameters.SortingOrder;
            limit?: Parameters.Limit;
            page?: Parameters.Page;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: {
                    totalDocs?: number;
                    limit?: number;
                    page?: number;
                    totalPages?: number;
                    hasPrevPage?: boolean;
                    hasNextPage?: boolean;
                    prevPage?: number | null;
                    nextPage?: number | null;
                    docs?: Components.Schemas.UserReportAceDto[];
                };
            }
        }
    }
    namespace UserReportAclControllerFindOne {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.UserReportAceDto;
            }
        }
    }
    namespace UserReportAclControllerRemove {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.UserReportAceDto;
            }
        }
    }
    namespace UserReportAclControllerUpdate {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.UpdateUserReportAceDto;
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.UserReportAceDto;
            }
        }
    }
    namespace UserSubscriptionsControllerCreate {
        export type RequestBody = Components.Schemas.CreateUserSubscriptionDto;
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.UserSubscriptionDto;
            }
            export interface $201 {
            }
        }
    }
    namespace UserSubscriptionsControllerFindAll {
        namespace Parameters {
            export type CompetitionGroupIds = string[];
            export type CompetitionIds = string[];
            export type Limit = number;
            export type Page = number;
            export type SortBy = "id" | "user" | "startDate" | "endDate";
            export type SortingOrder = "asc" | "desc";
            export type UserId = string;
        }
        export interface QueryParameters {
            userId?: Parameters.UserId;
            competitionIds?: Parameters.CompetitionIds;
            competitionGroupIds?: Parameters.CompetitionGroupIds;
            sortBy?: Parameters.SortBy;
            sortingOrder?: Parameters.SortingOrder;
            limit?: Parameters.Limit;
            page?: Parameters.Page;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: {
                    totalDocs?: number;
                    limit?: number;
                    page?: number;
                    totalPages?: number;
                    hasPrevPage?: boolean;
                    hasNextPage?: boolean;
                    prevPage?: number | null;
                    nextPage?: number | null;
                    docs?: Components.Schemas.UserSubscriptionDto[];
                };
            }
        }
    }
    namespace UserSubscriptionsControllerFindOne {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.UserSubscriptionDto;
            }
        }
    }
    namespace UserSubscriptionsControllerRemove {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.UserSubscriptionDto;
            }
        }
    }
    namespace UserSubscriptionsControllerUpdate {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.UpdateUserSubscriptionDto;
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.UserSubscriptionDto;
            }
        }
    }
    namespace UsersControllerChangeRole {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.ChangeRoleDto;
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.UserDto;
            }
        }
    }
    namespace UsersControllerCreate {
        export type RequestBody = Components.Schemas.CreateUserDto;
        namespace Responses {
            export interface $201 {
                success: boolean;
                message: string;
                data?: Components.Schemas.UserDto;
            }
        }
    }
    namespace UsersControllerFindAll {
        namespace Parameters {
            export type ClubIds = string[];
            export type FootballRoleIds = string[];
            export type Limit = number;
            export type Name = string;
            export type Page = number;
            export type RegionIds = string[];
            export type Role = "ADMIN" | "PLAYMAKER_SCOUT" | "PLAYMAKER_SCOUT_MANAGER" | "SCOUT";
            export type SortBy = "id" | "firstName" | "lastName" | "club" | "footballRole" | "region" | "reportsCount" | "notesCount" | "insiderNotesCount";
            export type SortingOrder = "asc" | "desc";
        }
        export interface QueryParameters {
            name?: Parameters.Name;
            role?: Parameters.Role;
            regionIds?: Parameters.RegionIds;
            clubIds?: Parameters.ClubIds;
            footballRoleIds?: Parameters.FootballRoleIds;
            sortBy?: Parameters.SortBy;
            sortingOrder?: Parameters.SortingOrder;
            limit?: Parameters.Limit;
            page?: Parameters.Page;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: {
                    totalDocs?: number;
                    limit?: number;
                    page?: number;
                    totalPages?: number;
                    hasPrevPage?: boolean;
                    hasNextPage?: boolean;
                    prevPage?: number | null;
                    nextPage?: number | null;
                    docs?: Components.Schemas.UserDto[];
                };
            }
        }
    }
    namespace UsersControllerFindOne {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.UserDto;
            }
        }
    }
    namespace UsersControllerGetList {
        namespace Responses {
            export interface $200 {
                success: boolean;
                message: string;
                data?: Components.Schemas.UserBasicDataDto[];
            }
        }
    }
    namespace UsersControllerUploadFile {
        export interface RequestBody {
            file?: string; // binary
        }
        namespace Responses {
            export interface $201 {
            }
        }
    }
}
