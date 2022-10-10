
using AutoMapper;
using System.Linq;
using Positivo.InterfaceAPI.Domain;
using Positivo.InterfaceAPI.Dto;


namespace Positivo.InterfaceAPI.Configuration.AutoMapper
{

    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, UserDto>()
                .ForMember(userDto => userDto.Roles, opt => opt.MapFrom(user => user.UserRoles.Select(iur => iur.Role.Name).ToHashSet()))
            .ReverseMap()
                .ForPath(user => user.UserRoles, opt => opt.MapFrom(userDto => userDto.Roles.Select(role => new UserRole { Role = new Role { Name = role }, UserId = userDto.Id }).ToHashSet()));

            CreateMap<Turmas, TurmasDto>().ReverseMap();
            CreateMap<Alunos, AlunosDto>().ReverseMap();
            CreateMap<AlunosTurma, AlunosTurmaDto>().ReverseMap();
            CreateMap<PessoasContato, PessoasContatoDto>().ReverseMap();
            CreateMap<Professores, ProfessoresDto>().ReverseMap();
            CreateMap<ProfessoresTurma, ProfessoresTurmaDto>().ReverseMap();
            CreateMap<UnidadesFisicas, UnidadesFisicasDto>().ReverseMap();
            CreateMap<NiveisEnsino, NiveisEnsinoDto>().ReverseMap();
            CreateMap<Funcionarios, FuncionariosDto>().ReverseMap();
            CreateMap<InterfaceIntegracao, InterfaceIntegracaoDto>().ReverseMap();
        }
    }
}
