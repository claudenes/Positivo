using System;

using AutoMapper;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using FluentAssertions;
using Positivo.InterfaceAPI.Infrastructure.Data;
using Positivo.InterfaceAPI.Domain;
using Positivo.InterfaceAPI.Domain.Repositories.Interfaces;
using Positivo.InterfaceAPI.Dto;
using Positivo.InterfaceAPI.Configuration.AutoMapper;
using Positivo.InterfaceAPI.Test.Setup;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using Xunit;

namespace Positivo.InterfaceAPI.Test.Controllers
{
    public class AlunosControllerIntTest
    {
        public AlunosControllerIntTest()
        {
            _factory = new AppWebApplicationFactory<TestStartup>().WithMockUser();
            _client = _factory.CreateClient();

            _alunosRepository = _factory.GetRequiredService<IAlunosRepository>();

            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new AutoMapperProfile());
            });
            _mapper = config.CreateMapper();

            InitTest();
        }

        private const string DefaultAluno = "AAAAAAAAAA";
        private const string UpdatedAluno = "BBBBBBBBBB";

        private static readonly decimal? DefaultPessoa = 1M;
        private static readonly decimal? UpdatedPessoa = 2M;

        private const string DefaultNome = "AAAAAAAAAA";
        private const string UpdatedNome = "BBBBBBBBBB";

        private const string DefaultSobrenome = "AAAAAAAAAA";
        private const string UpdatedSobrenome = "BBBBBBBBBB";

        private const string DefaultPrimeironome = "AAAAAAAAAA";
        private const string UpdatedPrimeironome = "BBBBBBBBBB";

        private const string DefaultSituacao = "AAAAAAAAAA";
        private const string UpdatedSituacao = "BBBBBBBBBB";

        private const string DefaultTurno = "AAAAAAAAAA";
        private const string UpdatedTurno = "BBBBBBBBBB";

        private const string DefaultCurriculo = "AAAAAAAAAA";
        private const string UpdatedCurriculo = "BBBBBBBBBB";

        private static readonly int? DefaultSerie = 1;
        private static readonly int? UpdatedSerie = 2;

        private static readonly int? DefaultAnoingresso = 1;
        private static readonly int? UpdatedAnoingresso = 2;

        private const string DefaultSenha = "AAAAAAAAAA";
        private const string UpdatedSenha = "BBBBBBBBBB";

        private static readonly DateTime? DefaultDtatualizacao = DateTime.UnixEpoch;
        private static readonly DateTime? UpdatedDtatualizacao = DateTime.Now;

        private readonly AppWebApplicationFactory<TestStartup> _factory;
        private readonly HttpClient _client;
        private readonly IAlunosRepository _alunosRepository;

        private Alunos _alunos;

        private readonly IMapper _mapper;

        private Alunos CreateEntity()
        {
            return new Alunos
            {
                Aluno = DefaultAluno,
                Pessoa = DefaultPessoa,
                Nome = DefaultNome,
                Sobrenome = DefaultSobrenome,
                Primeironome = DefaultPrimeironome,
                Situacao = DefaultSituacao,
                Turno = DefaultTurno,
                Curriculo = DefaultCurriculo,
                Serie = DefaultSerie,
                Anoingresso = DefaultAnoingresso,
                Senha = DefaultSenha,
                Dtatualizacao = DefaultDtatualizacao,
            };
        }

        private void InitTest()
        {
            _alunos = CreateEntity();
        }

        [Fact]
        public async Task CreateAlunos()
        {
            var databaseSizeBeforeCreate = await _alunosRepository.CountAsync();

            // Create the Alunos
            AlunosDto _alunosDto = _mapper.Map<AlunosDto>(_alunos);
            var response = await _client.PostAsync("/api/alunos", TestUtil.ToJsonContent(_alunosDto));
            response.StatusCode.Should().Be(HttpStatusCode.Created);

            // Validate the Alunos in the database
            var alunosList = await _alunosRepository.GetAllAsync();
            alunosList.Count().Should().Be(databaseSizeBeforeCreate + 1);
            var testAlunos = alunosList.Last();
            testAlunos.Aluno.Should().Be(DefaultAluno);
            testAlunos.Pessoa.Should().Be(DefaultPessoa);
            testAlunos.Nome.Should().Be(DefaultNome);
            testAlunos.Sobrenome.Should().Be(DefaultSobrenome);
            testAlunos.Primeironome.Should().Be(DefaultPrimeironome);
            testAlunos.Situacao.Should().Be(DefaultSituacao);
            testAlunos.Turno.Should().Be(DefaultTurno);
            testAlunos.Curriculo.Should().Be(DefaultCurriculo);
            testAlunos.Serie.Should().Be(DefaultSerie);
            testAlunos.Anoingresso.Should().Be(DefaultAnoingresso);
            testAlunos.Senha.Should().Be(DefaultSenha);
            testAlunos.Dtatualizacao.Should().Be(DefaultDtatualizacao);
        }

        [Fact]
        public async Task CreateAlunosWithExistingId()
        {
            var databaseSizeBeforeCreate = await _alunosRepository.CountAsync();
            // Create the Alunos with an existing ID
            _alunos.Id = 1L;

            // An entity with an existing ID cannot be created, so this API call must fail
            AlunosDto _alunosDto = _mapper.Map<AlunosDto>(_alunos);
            var response = await _client.PostAsync("/api/alunos", TestUtil.ToJsonContent(_alunosDto));

            // Validate the Alunos in the database
            var alunosList = await _alunosRepository.GetAllAsync();
            alunosList.Count().Should().Be(databaseSizeBeforeCreate);
        }

        [Fact]
        public async Task CheckAlunoIsRequired()
        {
            var databaseSizeBeforeTest = await _alunosRepository.CountAsync();

            // Set the field to null
            _alunos.Aluno = null;

            // Create the Alunos, which fails.
            AlunosDto _alunosDto = _mapper.Map<AlunosDto>(_alunos);
            var response = await _client.PostAsync("/api/alunos", TestUtil.ToJsonContent(_alunosDto));
            response.StatusCode.Should().Be(HttpStatusCode.BadRequest);

            var alunosList = await _alunosRepository.GetAllAsync();
            alunosList.Count().Should().Be(databaseSizeBeforeTest);
        }

        [Fact]
        public async Task GetAllAlunos()
        {
            // Initialize the database
            await _alunosRepository.CreateOrUpdateAsync(_alunos);
            await _alunosRepository.SaveChangesAsync();

            // Get all the alunosList
            var response = await _client.GetAsync("/api/alunos?sort=id,desc");
            response.StatusCode.Should().Be(HttpStatusCode.OK);

            var json = JToken.Parse(await response.Content.ReadAsStringAsync());
            json.SelectTokens("$.[*].id").Should().Contain(_alunos.Id);
            json.SelectTokens("$.[*].aluno").Should().Contain(DefaultAluno);
            json.SelectTokens("$.[*].pessoa").Should().Contain(DefaultPessoa);
            json.SelectTokens("$.[*].nome").Should().Contain(DefaultNome);
            json.SelectTokens("$.[*].sobrenome").Should().Contain(DefaultSobrenome);
            json.SelectTokens("$.[*].primeironome").Should().Contain(DefaultPrimeironome);
            json.SelectTokens("$.[*].situacao").Should().Contain(DefaultSituacao);
            json.SelectTokens("$.[*].turno").Should().Contain(DefaultTurno);
            json.SelectTokens("$.[*].curriculo").Should().Contain(DefaultCurriculo);
            json.SelectTokens("$.[*].serie").Should().Contain(DefaultSerie);
            json.SelectTokens("$.[*].anoingresso").Should().Contain(DefaultAnoingresso);
            json.SelectTokens("$.[*].senha").Should().Contain(DefaultSenha);
            json.SelectTokens("$.[*].dtatualizacao").Should().Contain(DefaultDtatualizacao);
        }

        [Fact]
        public async Task GetAlunos()
        {
            // Initialize the database
            await _alunosRepository.CreateOrUpdateAsync(_alunos);
            await _alunosRepository.SaveChangesAsync();

            // Get the alunos
            var response = await _client.GetAsync($"/api/alunos/{_alunos.Id}");
            response.StatusCode.Should().Be(HttpStatusCode.OK);

            var json = JToken.Parse(await response.Content.ReadAsStringAsync());
            json.SelectTokens("$.id").Should().Contain(_alunos.Id);
            json.SelectTokens("$.aluno").Should().Contain(DefaultAluno);
            json.SelectTokens("$.pessoa").Should().Contain(DefaultPessoa);
            json.SelectTokens("$.nome").Should().Contain(DefaultNome);
            json.SelectTokens("$.sobrenome").Should().Contain(DefaultSobrenome);
            json.SelectTokens("$.primeironome").Should().Contain(DefaultPrimeironome);
            json.SelectTokens("$.situacao").Should().Contain(DefaultSituacao);
            json.SelectTokens("$.turno").Should().Contain(DefaultTurno);
            json.SelectTokens("$.curriculo").Should().Contain(DefaultCurriculo);
            json.SelectTokens("$.serie").Should().Contain(DefaultSerie);
            json.SelectTokens("$.anoingresso").Should().Contain(DefaultAnoingresso);
            json.SelectTokens("$.senha").Should().Contain(DefaultSenha);
            json.SelectTokens("$.dtatualizacao").Should().Contain(DefaultDtatualizacao);
        }

        [Fact]
        public async Task GetNonExistingAlunos()
        {
            var maxValue = long.MaxValue;
            var response = await _client.GetAsync("/api/alunos/" + maxValue);
            response.StatusCode.Should().Be(HttpStatusCode.NotFound);
        }

        [Fact]
        public async Task UpdateAlunos()
        {
            // Initialize the database
            await _alunosRepository.CreateOrUpdateAsync(_alunos);
            await _alunosRepository.SaveChangesAsync();
            var databaseSizeBeforeUpdate = await _alunosRepository.CountAsync();

            // Update the alunos
            var updatedAlunos = await _alunosRepository.QueryHelper().GetOneAsync(it => it.Id == _alunos.Id);
            // Disconnect from session so that the updates on updatedAlunos are not directly saved in db
            //TODO detach
            updatedAlunos.Aluno = UpdatedAluno;
            updatedAlunos.Pessoa = UpdatedPessoa;
            updatedAlunos.Nome = UpdatedNome;
            updatedAlunos.Sobrenome = UpdatedSobrenome;
            updatedAlunos.Primeironome = UpdatedPrimeironome;
            updatedAlunos.Situacao = UpdatedSituacao;
            updatedAlunos.Turno = UpdatedTurno;
            updatedAlunos.Curriculo = UpdatedCurriculo;
            updatedAlunos.Serie = UpdatedSerie;
            updatedAlunos.Anoingresso = UpdatedAnoingresso;
            updatedAlunos.Senha = UpdatedSenha;
            updatedAlunos.Dtatualizacao = UpdatedDtatualizacao;

            AlunosDto updatedAlunosDto = _mapper.Map<AlunosDto>(updatedAlunos);
            var response = await _client.PutAsync($"/api/alunos/{_alunos.Id}", TestUtil.ToJsonContent(updatedAlunosDto));
            response.StatusCode.Should().Be(HttpStatusCode.OK);

            // Validate the Alunos in the database
            var alunosList = await _alunosRepository.GetAllAsync();
            alunosList.Count().Should().Be(databaseSizeBeforeUpdate);
            var testAlunos = alunosList.Last();
            testAlunos.Aluno.Should().Be(UpdatedAluno);
            testAlunos.Pessoa.Should().Be(UpdatedPessoa);
            testAlunos.Nome.Should().Be(UpdatedNome);
            testAlunos.Sobrenome.Should().Be(UpdatedSobrenome);
            testAlunos.Primeironome.Should().Be(UpdatedPrimeironome);
            testAlunos.Situacao.Should().Be(UpdatedSituacao);
            testAlunos.Turno.Should().Be(UpdatedTurno);
            testAlunos.Curriculo.Should().Be(UpdatedCurriculo);
            testAlunos.Serie.Should().Be(UpdatedSerie);
            testAlunos.Anoingresso.Should().Be(UpdatedAnoingresso);
            testAlunos.Senha.Should().Be(UpdatedSenha);
            testAlunos.Dtatualizacao.Should().Be(UpdatedDtatualizacao);
        }

        [Fact]
        public async Task UpdateNonExistingAlunos()
        {
            var databaseSizeBeforeUpdate = await _alunosRepository.CountAsync();

            // If the entity doesn't have an ID, it will throw BadRequestAlertException
            AlunosDto _alunosDto = _mapper.Map<AlunosDto>(_alunos);
            var response = await _client.PutAsync("/api/alunos/1", TestUtil.ToJsonContent(_alunosDto));
            response.StatusCode.Should().Be(HttpStatusCode.BadRequest);

            // Validate the Alunos in the database
            var alunosList = await _alunosRepository.GetAllAsync();
            alunosList.Count().Should().Be(databaseSizeBeforeUpdate);
        }

        [Fact]
        public async Task DeleteAlunos()
        {
            // Initialize the database
            await _alunosRepository.CreateOrUpdateAsync(_alunos);
            await _alunosRepository.SaveChangesAsync();
            var databaseSizeBeforeDelete = await _alunosRepository.CountAsync();

            var response = await _client.DeleteAsync($"/api/alunos/{_alunos.Id}");
            response.StatusCode.Should().Be(HttpStatusCode.OK);

            // Validate the database is empty
            var alunosList = await _alunosRepository.GetAllAsync();
            alunosList.Count().Should().Be(databaseSizeBeforeDelete - 1);
        }

        [Fact]
        public void EqualsVerifier()
        {
            TestUtil.EqualsVerifier(typeof(Alunos));
            var alunos1 = new Alunos
            {
                Id = 1L
            };
            var alunos2 = new Alunos
            {
                Id = alunos1.Id
            };
            alunos1.Should().Be(alunos2);
            alunos2.Id = 2L;
            alunos1.Should().NotBe(alunos2);
            alunos1.Id = 0;
            alunos1.Should().NotBe(alunos2);
        }
    }
}
