USE [DebtDb]
GO
/****** Object:  Table [dbo].[Debt]    Script Date: 15/05/2026 10:37:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Debt](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[CustomerId] [int] NOT NULL,
	[DebtReference] [nvarchar](50) NOT NULL,
	[OriginalBalance] [decimal](18, 0) NOT NULL,
	[CurrentBalance] [decimal](18, 0) NOT NULL,
	[Creditor] [nvarchar](250) NOT NULL,
	[DebtStatusId] [int] NOT NULL,
	[DebtCreatedDate] [datetime] NOT NULL,
 CONSTRAINT [PK_Debt] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DebtStatus]    Script Date: 15/05/2026 10:37:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DebtStatus](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](30) NULL,
 CONSTRAINT [PK_DebtStatus] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[RepaymentPlan]    Script Date: 15/05/2026 10:37:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RepaymentPlan](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[DebtId] [int] NULL,
	[MonthlyPaymentAmount] [decimal](18, 0) NULL,
	[DateStarted] [datetime] NULL,
 CONSTRAINT [PK_RepaymentPlan] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Debt] ON 
GO
INSERT [dbo].[Debt] ([Id], [CustomerId], [DebtReference], [OriginalBalance], [CurrentBalance], [Creditor], [DebtStatusId], [DebtCreatedDate]) VALUES (1, 101, N'PG20261', CAST(5000 AS Decimal(18, 0)), CAST(4000 AS Decimal(18, 0)), N'Barclays', 1, CAST(N'2026-01-05T00:00:00.000' AS DateTime))
GO
INSERT [dbo].[Debt] ([Id], [CustomerId], [DebtReference], [OriginalBalance], [CurrentBalance], [Creditor], [DebtStatusId], [DebtCreatedDate]) VALUES (3, 101, N'PG20262', CAST(2500 AS Decimal(18, 0)), CAST(2000 AS Decimal(18, 0)), N'Lloyds', 1, CAST(N'2025-12-01T00:00:00.000' AS DateTime))
GO
SET IDENTITY_INSERT [dbo].[Debt] OFF
GO
SET IDENTITY_INSERT [dbo].[DebtStatus] ON 
GO
INSERT [dbo].[DebtStatus] ([Id], [Name]) VALUES (1, N'Active')
GO
INSERT [dbo].[DebtStatus] ([Id], [Name]) VALUES (2, N'Paid')
GO
INSERT [dbo].[DebtStatus] ([Id], [Name]) VALUES (3, N'In Arrears')
GO
SET IDENTITY_INSERT [dbo].[DebtStatus] OFF
GO
SET IDENTITY_INSERT [dbo].[RepaymentPlan] ON 
GO
INSERT [dbo].[RepaymentPlan] ([Id], [DebtId], [MonthlyPaymentAmount], [DateStarted]) VALUES (1, 1, CAST(100 AS Decimal(18, 0)), CAST(N'2026-06-01T00:00:00.000' AS DateTime))
GO
INSERT [dbo].[RepaymentPlan] ([Id], [DebtId], [MonthlyPaymentAmount], [DateStarted]) VALUES (3, 3, CAST(100 AS Decimal(18, 0)), CAST(N'2026-05-29T00:00:00.000' AS DateTime))
GO
SET IDENTITY_INSERT [dbo].[RepaymentPlan] OFF
GO
