USE [ProiectColectiv]
GO
SET IDENTITY_INSERT [dbo].[Class] ON 

GO
INSERT [dbo].[Class] ([Id], [Name]) VALUES (1, N'Class 1')
GO
INSERT [dbo].[Class] ([Id], [Name]) VALUES (2, N'Class 2')
GO
INSERT [dbo].[Class] ([Id], [Name]) VALUES (3, N'new class df')
GO
INSERT [dbo].[Class] ([Id], [Name]) VALUES (1005, N'Ceva nou 2')
GO
INSERT [dbo].[Class] ([Id], [Name]) VALUES (2014, N'New class')
GO
SET IDENTITY_INSERT [dbo].[Class] OFF
GO
SET IDENTITY_INSERT [dbo].[Users] ON 

GO
INSERT [dbo].[Users] ([Id], [Username], [Role], [Name], [PasswordSalt], [PasswordHash], [Email]) VALUES (2, N'admin', 0, N'admin', 0xD34B21A243C07237400A231557F95C4B3692010A0352B64948CDD62E42766501, 0x46FCE7D70B19A3410CD0313E821B2821327FE0B0, N'admin@a.a')
GO
INSERT [dbo].[Users] ([Id], [Username], [Role], [Name], [PasswordSalt], [PasswordHash], [Email]) VALUES (3, N'user1', 2, N'user1', 0x1DB66CABE4823853C1D3C7FB9729B1DAA4AD7224B6FEF921C62825937F328CAA, 0xF4A8FAEEAE4B9F77B039C49731AB32E8E2ABDD90, N'user@a.a')
GO
INSERT [dbo].[Users] ([Id], [Username], [Role], [Name], [PasswordSalt], [PasswordHash], [Email]) VALUES (4, N'trainer', 1, N'trainer1', 0x924BA766EC4D4293DCBD5D05C14D21F8A5DF249BB8A49B39C4BBAFFC44D43E6C, 0x4EC0DF75E0A2C0AFADA029B21956CC83B835050F, N'trainer@a.a')
GO
INSERT [dbo].[Users] ([Id], [Username], [Role], [Name], [PasswordSalt], [PasswordHash], [Email]) VALUES (5, N'user2', 2, N'user2', 0xBAED46728558D435CC374A237D6BA2C65C5225A2999397C37A2BC1951293373C, 0xF9B5A3B06354D220B10BE31F4A1A9DD132BF13FB, N'user@a.a')
GO
INSERT [dbo].[Users] ([Id], [Username], [Role], [Name], [PasswordSalt], [PasswordHash], [Email]) VALUES (1005, N'testUser', 2, N'Aiu Babalicu', 0x55477AC696A068CFD65B4916BC48F10DFF24C629C90830469C00FE2D3E9CF9EA, 0x07FE94F6952BCF5D2B003E04DC365FA22A2573E0, N'aiu@aiu.aiu')
GO
SET IDENTITY_INSERT [dbo].[Users] OFF
GO
SET IDENTITY_INSERT [dbo].[ClassSchedule] ON 

GO
INSERT [dbo].[ClassSchedule] ([Id], [ClassId], [Date], [Capacity], [AvailableCapacity], [Room], [Difficulty], [TrainerId]) VALUES (4, 1, CAST(0x0000A85700000000 AS DateTime), 100, 100, N'A1', 0, 4)
GO
INSERT [dbo].[ClassSchedule] ([Id], [ClassId], [Date], [Capacity], [AvailableCapacity], [Room], [Difficulty], [TrainerId]) VALUES (5, 2, CAST(0x0000A85500000000 AS DateTime), 50, 50, N'A2', 1, 4)
GO
INSERT [dbo].[ClassSchedule] ([Id], [ClassId], [Date], [Capacity], [AvailableCapacity], [Room], [Difficulty], [TrainerId]) VALUES (6, 3, CAST(0x00008F940083D600 AS DateTime), 355, 355, N'yyuu', 2, 4)
GO
INSERT [dbo].[ClassSchedule] ([Id], [ClassId], [Date], [Capacity], [AvailableCapacity], [Room], [Difficulty], [TrainerId]) VALUES (14, 3, CAST(0x00008F9400A4CB80 AS DateTime), 30, 30, N'yuugara', 0, 4)
GO
INSERT [dbo].[ClassSchedule] ([Id], [ClassId], [Date], [Capacity], [AvailableCapacity], [Room], [Difficulty], [TrainerId]) VALUES (16, 3, CAST(0x00008F9400C5C100 AS DateTime), 90, 90, N'burt', 1, 4)
GO
INSERT [dbo].[ClassSchedule] ([Id], [ClassId], [Date], [Capacity], [AvailableCapacity], [Room], [Difficulty], [TrainerId]) VALUES (1003, 3, CAST(0x0000A85F01206678 AS DateTime), 1, 1, N'B52', 1, 4)
GO
INSERT [dbo].[ClassSchedule] ([Id], [ClassId], [Date], [Capacity], [AvailableCapacity], [Room], [Difficulty], [TrainerId]) VALUES (1006, 1005, CAST(0x00008E9800E3F760 AS DateTime), 315, 315, N'fa', 1, 4)
GO
INSERT [dbo].[ClassSchedule] ([Id], [ClassId], [Date], [Capacity], [AvailableCapacity], [Room], [Difficulty], [TrainerId]) VALUES (1007, 1005, CAST(0x00008E9800E3F760 AS DateTime), 315, 315, N'fa', 1, 4)
GO
SET IDENTITY_INSERT [dbo].[ClassSchedule] OFF
GO
SET IDENTITY_INSERT [dbo].[Feedback] ON 

GO
INSERT [dbo].[Feedback] ([Id], [TrainerId], [UserId], [Text], [Rating]) VALUES (1, 4, 2, N' ', 5)
GO
INSERT [dbo].[Feedback] ([Id], [TrainerId], [UserId], [Text], [Rating]) VALUES (2, 4, 5, N'Name', 2)
GO
INSERT [dbo].[Feedback] ([Id], [TrainerId], [UserId], [Text], [Rating]) VALUES (3, 4, 3, N'Name', 5)
GO
INSERT [dbo].[Feedback] ([Id], [TrainerId], [UserId], [Text], [Rating]) VALUES (1003, 4, 1005, N'text in pula mea', 5)
GO
SET IDENTITY_INSERT [dbo].[Feedback] OFF
GO
SET IDENTITY_INSERT [dbo].[PersonalSchedule] ON 

GO
INSERT [dbo].[PersonalSchedule] ([Id], [ParticipantId], [TrainerId], [Date], [Room]) VALUES (7, 5, 4, CAST(0x0000A85F00A4CB80 AS DateTime), N'oriunde')
GO
INSERT [dbo].[PersonalSchedule] ([Id], [ParticipantId], [TrainerId], [Date], [Room]) VALUES (8, 3, 4, CAST(0x0000A85F00A4CB80 AS DateTime), N'oriunde 2')
GO
INSERT [dbo].[PersonalSchedule] ([Id], [ParticipantId], [TrainerId], [Date], [Room]) VALUES (9, 3, 4, CAST(0x0000A85F00A4CB80 AS DateTime), N'oriunde 2')
GO
SET IDENTITY_INSERT [dbo].[PersonalSchedule] OFF
GO
