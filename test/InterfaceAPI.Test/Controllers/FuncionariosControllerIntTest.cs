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
    public class FuncionariosControllerIntTest
    {
        public FuncionariosControllerIntTest()
        {
            _factory = new AppWebApplicationFactory<TestStartup>().WithMockUser();
            _client = _factory.CreateClient();

            _funcionariosRepository = _factory.GetRequiredService<IFuncionariosRepository>();

            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new AutoMapperProfile());
            });
            _mapper = config.CreateMapper();

            InitTest();
        }

        private static readonly decimal? DefaultFuncionario = 1M;
        private static readonly decimal? UpdatedFuncionario = 2M;

        private const string DefaultNome = "AAAAAAAAAA";
        private const string UpdatedNome = "BBBBBBBBBB";

        private const string DefaultPrimeironome = "AAAAAAAAAA";
        private const string UpdatedPrimeironome = "BBBBBBBBBB";

        private const string DefaultSobrenome = "AAAAAAAAAA";
        private const string UpdatedSobrenome = "BBBBBBBBBB";

        private static readonly DateTime? DefaultDatanascimento = DateTime.UnixEpoch;
        private static readonly DateTime? UpdatedDatanascimento = DateTime.Now;

        private static readonly decimal? DefaultCpf = 1M;
        private static readonly decimal? UpdatedCpf = 2M;

        private const string DefaultUnidadefisicaFolha = "AAAAAAAAAA";
        private const string UpdatedUnidadefisicaFolha = "BBBBBBBBBB";

        private const string DefaultSenha = "AAAAAAAAAA";
        private const string UpdatedSenha = "BBBBBBBBBB";

        private const string DefaultSituacao = "AAAAAAAAAA";
        private const string UpdatedSituacao = "BBBBBBBBBB";

        private static readonly DateTime? DefaultDtatualizacao = DateTime.UnixEpoch;
        private static readonly DateTime? UpdatedDtatualizacao = DateTime.Now;

        private readonly AppWebApplicationFactory<TestStartup> _factory;
        private readonly HttpClient _client;
        private readonly IFuncionariosRepository _funcionariosRepository;

        private Funcionarios _funcionarios;

        private readonly IMapper _mapper;

        private Funcionarios CreateEntity()
        {
            return new Funcionarios
            {
                Funcionario = DefaultFuncionario,
                Nome = DefaultNome,
                Primeironome = DefaultPrimeironome,
                Sobrenome = DefaultSobrenome,
                Datanascimento = DefaultDatanascimento,
                Cpf = DefaultCpf,
                UnidadefisicaFolha = DefaultUnidadefisicaFolha,
                Senha = DefaultSenha,
                Situacao = DefaultSituacao,
                Dtatualizacao = DefaultDtatualizacao,
            };
        }

        private void InitTest()
        {
            _funcionarios = CreateEntity();
        }

        [Fact]
        public async Task CreateFuncionarios()
        {
            var databaseSizeBeforeCreate = await _funcionariosRepository.CountAsync();

            // Create the Funcionarios
            FuncionariosDto _funcionariosDto = _mapper.Map<FuncionariosDto>(_funcionarios);
            var response = await _client.PostAsync("/api/funcionarios", TestUtil.ToJsonContent(_funcionariosDto));
            response.StatusCode.Should().Be(HttpStatusCode.Created);

            // Validate the Funcionarios in the database
            var funcionariosList = await _funcionariosRepository.GetAllAsync();
            funcionariosList.Count().Should().Be(databaseSizeBeforeCreate + 1);
            var testFuncionarios = funcionariosList.Last();
            testFuncionarios.Funcionario.Should().Be(DefaultFuncionario);
            testFuncionarios.Nome.Should().Be(DefaultNome);
            testFuncionarios.Primeironome.Should().Be(DefaultPrimeironome);
            testFuncionarios.Sobrenome.Should().Be(DefaultSobrenome);
            testFuncionarios.Datanascimento.Should().Be(DefaultDatanascimento);
            testFuncionarios.Cpf.Should().Be(DefaultCpf);
            testFuncionarios.UnidadefisicaFolha.Should().Be(DefaultUnidadefisicaFolha);
            testFuncionarios.Senha.Should().Be(DefaultSenha);
            testFuncionarios.Situacao.Should().Be(DefaultSituacao);
            testFuncionarios.Dtatualizacao.Should().Be(DefaultDtatualizacao);
        }

        [Fact]
        public async Task CreateFuncionariosWithExistingId()
        {
            var databaseSizeBeforeCreate = await _funcionariosRepository.CountAsync();
            // Create the Funcionarios with an existing ID
            _funcionarios.Id = 1L;

            // An entity with an existing ID cannot be created, so this API call must fail
            FuncionariosDto _funcionariosDto = _mapper.Map<FuncionariosDto>(_funcionarios);
            var response = await _client.PostAsync("/api/funcionarios", TestUtil.ToJsonContent(_funcionariosDto));

            // Validate the Funcionarios in the database
            var funcionariosList = await _funcionariosRepository.GetAllAsync();
            funcionariosList.Count().Should().Be(databaseSizeBeforeCreate);
        }

        [Fact]
        public async Task CheckFuncionarioIsRequired()
        {
            var databaseSizeBeforeTest = await _funcionariosRepository.CountAsync();

            // Set the field to null
            _funcionarios.Funcionario = null;

            // Create the Funcionarios, which fails.
            FuncionariosDto _funcionariosDto = _mapper.Map<FuncionariosDto>(_funcionarios);
            var response = await _client.PostAsync("/api/funcionarios", TestUtil.ToJsonContent(_funcionariosDto));
            response.StatusCode.Should().Be(HttpStatusCode.BadRequest);

            var funcionariosList = await _funcionariosRepository.GetAllAsync();
            funcionariosList.Count().Should().Be(databaseSizeBeforeTest);
        }

        [Fact]
        public async Task GetAllFuncionarios()
        {
            // Initialize the database
            await _funcionariosRepository.CreateOrUpdateAsync(_funcionarios);
            await _funcionariosRepository.SaveChangesAsync();

            // Get all the funcionariosList
            var response = await _client.GetAsync("/api/funcionarios?sort=id,desc");
            response.StatusCode.Should().Be(HttpStatusCode.OK);

            var json = JToken.Parse(await response.Content.ReadAsStringAsync());
            json.SelectTokens("$.[*].id").Should().Contain(_funcionarios.Id);
            json.SelectTokens("$.[*].funcionario").Should().Contain(DefaultFuncionario);
            json.SelectTokens("$.[*].nome").Should().Contain(DefaultNome);
            json.SelectTokens("$.[*].primeironome").Should().Contain(DefaultPrimeironome);
            json.SelectTokens("$.[*].sobrenome").Should().Contain(DefaultSobrenome);
            json.SelectTokens("$.[*].datanascimento").Should().Contain(DefaultDatanascimento);
            json.SelectTokens("$.[*].cpf").Should().Contain(DefaultCpf);
            json.SelectTokens("$.[*].unidadefisicaFolha").Should().Contain(DefaultUnidadefisicaFolha);
            json.SelectTokens("$.[*].senha").Should().Contain(DefaultSenha);
            json.SelectTokens("$.[*].situacao").Should().Contain(DefaultSituacao);
            json.SelectTokens("$.[*].dtatualizacao").Should().Contain(DefaultDtatualizacao);
        }

        [Fact]
        public async Task GetFuncionarios()
        {
            // Initialize the database
            await _funcionariosRepository.CreateOrUpdateAsync(_funcionarios);
            await _funcionariosRepository.SaveChangesAsync();

            // Get the funcionarios
            var response = await _client.GetAsync($"/api/funcionarios/{_funcionarios.Id}");
            response.StatusCode.Should().Be(HttpStatusCode.OK);

            var json = JToken.Parse(await response.Content.ReadAsStringAsync());
            json.SelectTokens("$.id").Should().Contain(_funcionarios.Id);
            json.SelectTokens("$.funcionario").Should().Contain(DefaultFuncionario);
            json.SelectTokens("$.nome").Should().Contain(DefaultNome);
            json.SelectTokens("$.primeironome").Should().Contain(DefaultPrimeironome);
            json.SelectTokens("$.sobrenome").Should().Contain(DefaultSobrenome);
            json.SelectTokens("$.datanascimento").Should().Contain(DefaultDatanascimento);
            json.SelectTokens("$.cpf").Should().Contain(DefaultCpf);
            json.SelectTokens("$.unidadefisicaFolha").Should().Contain(DefaultUnidadefisicaFolha);
            json.SelectTokens("$.senha").Should().Contain(DefaultSenha);
            json.SelectTokens("$.situacao").Should().Contain(DefaultSituacao);
            json.SelectTokens("$.dtatualizacao").Should().Contain(DefaultDtatualizacao);
        }

        [Fact]
        public async Task GetNonExistingFuncionarios()
        {
            var maxValue = long.MaxValue;
            var response = await _client.GetAsync("/api/funcionarios/" + maxValue);
            response.StatusCode.Should().Be(HttpStatusCode.NotFound);
        }

        [Fact]
        public async Task UpdateFuncionarios()
        {
            // Initialize the database
            await _funcionariosRepository.CreateOrUpdateAsync(_funcionarios);
            await _funcionariosRepository.SaveChangesAsync();
            var databaseSizeBeforeUpdate = await _funcionariosRepository.CountAsync();

            // Update the funcionarios
            var updatedFuncionarios = await _funcionariosRepository.QueryHelper().GetOneAsync(it => it.Id == _funcionarios.Id);
            // Disconnect from session so that the updates on updatedFuncionarios are not directly saved in db
            //TODO detach
            updatedFuncionarios.Funcionario = UpdatedFuncionario;
            updatedFuncionarios.Nome = UpdatedNome;
            updatedFuncionarios.Primeironome = UpdatedPrimeironome;
            updatedFuncionarios.Sobrenome = UpdatedSobrenome;
            updatedFuncionarios.Datanascimento = UpdatedDatanascimento;
            updatedFuncionarios.Cpf = UpdatedCpf;
            updatedFuncionarios.UnidadefisicaFolha = UpdatedUnidadefisicaFolha;
            updatedFuncionarios.Senha = UpdatedSenha;
            updatedFuncionarios.Situacao = UpdatedSituacao;
            updatedFuncionarios.Dtatualizacao = UpdatedDtatualizacao;

            FuncionariosDto updatedFuncionariosDto = _mapper.Map<FuncionariosDto>(updatedFuncionarios);
            var response = await _client.PutAsync($"/api/funcionarios/{_funcionarios.Id}", TestUtil.ToJsonContent(updatedFuncionariosDto));
            response.StatusCode.Should().Be(HttpStatusCode.OK);

            // Validate the Funcionarios in the database
            var funcionariosList = await _funcionariosRepository.GetAllAsync();
            funcionariosList.Count().Should().Be(databaseSizeBeforeUpdate);
            var testFuncionarios = funcionariosList.Last();
            testFuncionarios.Funcionario.Should().Be(UpdatedFuncionario);
            testFuncionarios.Nome.Should().Be(UpdatedNome);
            testFuncionarios.Primeironome.Should().Be(UpdatedPrimeironome);
            testFuncionarios.Sobrenome.Should().Be(UpdatedSobrenome);
            testFuncionarios.Datanascimento.Should().Be(UpdatedDatanascimento);
            testFuncionarios.Cpf.Should().Be(UpdatedCpf);
            testFuncionarios.UnidadefisicaFolha.Should().Be(UpdatedUnidadefisicaFolha);
            testFuncionarios.Senha.Should().Be(UpdatedSenha);
            testFuncionarios.Situacao.Should().Be(UpdatedSituacao);
            testFuncionarios.Dtatualizacao.Should().Be(UpdatedDtatualizacao);
        }

        [Fact]
        public async Task UpdateNonExistingFuncionarios()
        {
            var databaseSizeBeforeUpdate = await _funcionariosRepository.CountAsync();

            // If the entity doesn't have an ID, it will throw BadRequestAlertException
            FuncionariosDto _funcionariosDto = _mapper.Map<FuncionariosDto>(_funcionarios);
            var response = await _client.PutAsync("/api/funcionarios/1", TestUtil.ToJsonContent(_funcionariosDto));
            response.StatusCode.Should().Be(HttpStatusCode.BadRequest);

            // Validate the Funcionarios in the database
            var funcionariosList = await _funcionariosRepository.GetAllAsync();
            funcionariosList.Count().Should().Be(databaseSizeBeforeUpdate);
        }

        [Fact]
        public async Task DeleteFuncionarios()
        {
            // Initialize the database
            await _funcionariosRepository.CreateOrUpdateAsync(_funcionarios);
            await _funcionariosRepository.SaveChangesAsync();
            var databaseSizeBeforeDelete = await _funcionariosRepository.CountAsync();

            var response = await _client.DeleteAsync($"/api/funcionarios/{_funcionarios.Id}");
            response.StatusCode.Should().Be(HttpStatusCode.OK);

            // Validate the database is empty
            var funcionariosList = await _funcionariosRepository.GetAllAsync();
            funcionariosList.Count().Should().Be(databaseSizeBeforeDelete - 1);
        }

        [Fact]
        public void EqualsVerifier()
        {
            TestUtil.EqualsVerifier(typeof(Funcionarios));
            var funcionarios1 = new Funcionarios
            {
                Id = 1L
            };
            var funcionarios2 = new Funcionarios
            {
                Id = funcionarios1.Id
            };
            funcionarios1.Should().Be(funcionarios2);
            funcionarios2.Id = 2L;
            funcionarios1.Should().NotBe(funcionarios2);
            funcionarios1.Id = 0;
            funcionarios1.Should().NotBe(funcionarios2);
        }
    }
}
