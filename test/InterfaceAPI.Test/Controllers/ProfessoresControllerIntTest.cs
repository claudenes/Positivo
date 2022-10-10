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
    public class ProfessoresControllerIntTest
    {
        public ProfessoresControllerIntTest()
        {
            _factory = new AppWebApplicationFactory<TestStartup>().WithMockUser();
            _client = _factory.CreateClient();

            _professoresRepository = _factory.GetRequiredService<IProfessoresRepository>();

            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new AutoMapperProfile());
            });
            _mapper = config.CreateMapper();

            InitTest();
        }

        private const string DefaultProfessor = "AAAAAAAAAA";
        private const string UpdatedProfessor = "BBBBBBBBBB";

        private static readonly decimal? DefaultPessoa = 1M;
        private static readonly decimal? UpdatedPessoa = 2M;

        private const string DefaultNome = "AAAAAAAAAA";
        private const string UpdatedNome = "BBBBBBBBBB";

        private const string DefaultPrimeironome = "AAAAAAAAAA";
        private const string UpdatedPrimeironome = "BBBBBBBBBB";

        private const string DefaultSobrenome = "AAAAAAAAAA";
        private const string UpdatedSobrenome = "BBBBBBBBBB";

        private const string DefaultSituacao = "AAAAAAAAAA";
        private const string UpdatedSituacao = "BBBBBBBBBB";

        private const string DefaultSenha = "AAAAAAAAAA";
        private const string UpdatedSenha = "BBBBBBBBBB";

        private static readonly DateTime? DefaultDtatualizacao = DateTime.UnixEpoch;
        private static readonly DateTime? UpdatedDtatualizacao = DateTime.Now;

        private readonly AppWebApplicationFactory<TestStartup> _factory;
        private readonly HttpClient _client;
        private readonly IProfessoresRepository _professoresRepository;

        private Professores _professores;

        private readonly IMapper _mapper;

        private Professores CreateEntity()
        {
            return new Professores
            {
                Professor = DefaultProfessor,
                Pessoa = DefaultPessoa,
                Nome = DefaultNome,
                Primeironome = DefaultPrimeironome,
                Sobrenome = DefaultSobrenome,
                Situacao = DefaultSituacao,
                Senha = DefaultSenha,
                Dtatualizacao = DefaultDtatualizacao,
            };
        }

        private void InitTest()
        {
            _professores = CreateEntity();
        }

        [Fact]
        public async Task CreateProfessores()
        {
            var databaseSizeBeforeCreate = await _professoresRepository.CountAsync();

            // Create the Professores
            ProfessoresDto _professoresDto = _mapper.Map<ProfessoresDto>(_professores);
            var response = await _client.PostAsync("/api/professores", TestUtil.ToJsonContent(_professoresDto));
            response.StatusCode.Should().Be(HttpStatusCode.Created);

            // Validate the Professores in the database
            var professoresList = await _professoresRepository.GetAllAsync();
            professoresList.Count().Should().Be(databaseSizeBeforeCreate + 1);
            var testProfessores = professoresList.Last();
            testProfessores.Professor.Should().Be(DefaultProfessor);
            testProfessores.Pessoa.Should().Be(DefaultPessoa);
            testProfessores.Nome.Should().Be(DefaultNome);
            testProfessores.Primeironome.Should().Be(DefaultPrimeironome);
            testProfessores.Sobrenome.Should().Be(DefaultSobrenome);
            testProfessores.Situacao.Should().Be(DefaultSituacao);
            testProfessores.Senha.Should().Be(DefaultSenha);
            testProfessores.Dtatualizacao.Should().Be(DefaultDtatualizacao);
        }

        [Fact]
        public async Task CreateProfessoresWithExistingId()
        {
            var databaseSizeBeforeCreate = await _professoresRepository.CountAsync();
            // Create the Professores with an existing ID
            _professores.Id = 1L;

            // An entity with an existing ID cannot be created, so this API call must fail
            ProfessoresDto _professoresDto = _mapper.Map<ProfessoresDto>(_professores);
            var response = await _client.PostAsync("/api/professores", TestUtil.ToJsonContent(_professoresDto));

            // Validate the Professores in the database
            var professoresList = await _professoresRepository.GetAllAsync();
            professoresList.Count().Should().Be(databaseSizeBeforeCreate);
        }

        [Fact]
        public async Task CheckProfessorIsRequired()
        {
            var databaseSizeBeforeTest = await _professoresRepository.CountAsync();

            // Set the field to null
            _professores.Professor = null;

            // Create the Professores, which fails.
            ProfessoresDto _professoresDto = _mapper.Map<ProfessoresDto>(_professores);
            var response = await _client.PostAsync("/api/professores", TestUtil.ToJsonContent(_professoresDto));
            response.StatusCode.Should().Be(HttpStatusCode.BadRequest);

            var professoresList = await _professoresRepository.GetAllAsync();
            professoresList.Count().Should().Be(databaseSizeBeforeTest);
        }

        [Fact]
        public async Task CheckPessoaIsRequired()
        {
            var databaseSizeBeforeTest = await _professoresRepository.CountAsync();

            // Set the field to null
            _professores.Pessoa = null;

            // Create the Professores, which fails.
            ProfessoresDto _professoresDto = _mapper.Map<ProfessoresDto>(_professores);
            var response = await _client.PostAsync("/api/professores", TestUtil.ToJsonContent(_professoresDto));
            response.StatusCode.Should().Be(HttpStatusCode.BadRequest);

            var professoresList = await _professoresRepository.GetAllAsync();
            professoresList.Count().Should().Be(databaseSizeBeforeTest);
        }

        [Fact]
        public async Task GetAllProfessores()
        {
            // Initialize the database
            await _professoresRepository.CreateOrUpdateAsync(_professores);
            await _professoresRepository.SaveChangesAsync();

            // Get all the professoresList
            var response = await _client.GetAsync("/api/professores?sort=id,desc");
            response.StatusCode.Should().Be(HttpStatusCode.OK);

            var json = JToken.Parse(await response.Content.ReadAsStringAsync());
            json.SelectTokens("$.[*].id").Should().Contain(_professores.Id);
            json.SelectTokens("$.[*].professor").Should().Contain(DefaultProfessor);
            json.SelectTokens("$.[*].pessoa").Should().Contain(DefaultPessoa);
            json.SelectTokens("$.[*].nome").Should().Contain(DefaultNome);
            json.SelectTokens("$.[*].primeironome").Should().Contain(DefaultPrimeironome);
            json.SelectTokens("$.[*].sobrenome").Should().Contain(DefaultSobrenome);
            json.SelectTokens("$.[*].situacao").Should().Contain(DefaultSituacao);
            json.SelectTokens("$.[*].senha").Should().Contain(DefaultSenha);
            json.SelectTokens("$.[*].dtatualizacao").Should().Contain(DefaultDtatualizacao);
        }

        [Fact]
        public async Task GetProfessores()
        {
            // Initialize the database
            await _professoresRepository.CreateOrUpdateAsync(_professores);
            await _professoresRepository.SaveChangesAsync();

            // Get the professores
            var response = await _client.GetAsync($"/api/professores/{_professores.Id}");
            response.StatusCode.Should().Be(HttpStatusCode.OK);

            var json = JToken.Parse(await response.Content.ReadAsStringAsync());
            json.SelectTokens("$.id").Should().Contain(_professores.Id);
            json.SelectTokens("$.professor").Should().Contain(DefaultProfessor);
            json.SelectTokens("$.pessoa").Should().Contain(DefaultPessoa);
            json.SelectTokens("$.nome").Should().Contain(DefaultNome);
            json.SelectTokens("$.primeironome").Should().Contain(DefaultPrimeironome);
            json.SelectTokens("$.sobrenome").Should().Contain(DefaultSobrenome);
            json.SelectTokens("$.situacao").Should().Contain(DefaultSituacao);
            json.SelectTokens("$.senha").Should().Contain(DefaultSenha);
            json.SelectTokens("$.dtatualizacao").Should().Contain(DefaultDtatualizacao);
        }

        [Fact]
        public async Task GetNonExistingProfessores()
        {
            var maxValue = long.MaxValue;
            var response = await _client.GetAsync("/api/professores/" + maxValue);
            response.StatusCode.Should().Be(HttpStatusCode.NotFound);
        }

        [Fact]
        public async Task UpdateProfessores()
        {
            // Initialize the database
            await _professoresRepository.CreateOrUpdateAsync(_professores);
            await _professoresRepository.SaveChangesAsync();
            var databaseSizeBeforeUpdate = await _professoresRepository.CountAsync();

            // Update the professores
            var updatedProfessores = await _professoresRepository.QueryHelper().GetOneAsync(it => it.Id == _professores.Id);
            // Disconnect from session so that the updates on updatedProfessores are not directly saved in db
            //TODO detach
            updatedProfessores.Professor = UpdatedProfessor;
            updatedProfessores.Pessoa = UpdatedPessoa;
            updatedProfessores.Nome = UpdatedNome;
            updatedProfessores.Primeironome = UpdatedPrimeironome;
            updatedProfessores.Sobrenome = UpdatedSobrenome;
            updatedProfessores.Situacao = UpdatedSituacao;
            updatedProfessores.Senha = UpdatedSenha;
            updatedProfessores.Dtatualizacao = UpdatedDtatualizacao;

            ProfessoresDto updatedProfessoresDto = _mapper.Map<ProfessoresDto>(updatedProfessores);
            var response = await _client.PutAsync($"/api/professores/{_professores.Id}", TestUtil.ToJsonContent(updatedProfessoresDto));
            response.StatusCode.Should().Be(HttpStatusCode.OK);

            // Validate the Professores in the database
            var professoresList = await _professoresRepository.GetAllAsync();
            professoresList.Count().Should().Be(databaseSizeBeforeUpdate);
            var testProfessores = professoresList.Last();
            testProfessores.Professor.Should().Be(UpdatedProfessor);
            testProfessores.Pessoa.Should().Be(UpdatedPessoa);
            testProfessores.Nome.Should().Be(UpdatedNome);
            testProfessores.Primeironome.Should().Be(UpdatedPrimeironome);
            testProfessores.Sobrenome.Should().Be(UpdatedSobrenome);
            testProfessores.Situacao.Should().Be(UpdatedSituacao);
            testProfessores.Senha.Should().Be(UpdatedSenha);
            testProfessores.Dtatualizacao.Should().Be(UpdatedDtatualizacao);
        }

        [Fact]
        public async Task UpdateNonExistingProfessores()
        {
            var databaseSizeBeforeUpdate = await _professoresRepository.CountAsync();

            // If the entity doesn't have an ID, it will throw BadRequestAlertException
            ProfessoresDto _professoresDto = _mapper.Map<ProfessoresDto>(_professores);
            var response = await _client.PutAsync("/api/professores/1", TestUtil.ToJsonContent(_professoresDto));
            response.StatusCode.Should().Be(HttpStatusCode.BadRequest);

            // Validate the Professores in the database
            var professoresList = await _professoresRepository.GetAllAsync();
            professoresList.Count().Should().Be(databaseSizeBeforeUpdate);
        }

        [Fact]
        public async Task DeleteProfessores()
        {
            // Initialize the database
            await _professoresRepository.CreateOrUpdateAsync(_professores);
            await _professoresRepository.SaveChangesAsync();
            var databaseSizeBeforeDelete = await _professoresRepository.CountAsync();

            var response = await _client.DeleteAsync($"/api/professores/{_professores.Id}");
            response.StatusCode.Should().Be(HttpStatusCode.OK);

            // Validate the database is empty
            var professoresList = await _professoresRepository.GetAllAsync();
            professoresList.Count().Should().Be(databaseSizeBeforeDelete - 1);
        }

        [Fact]
        public void EqualsVerifier()
        {
            TestUtil.EqualsVerifier(typeof(Professores));
            var professores1 = new Professores
            {
                Id = 1L
            };
            var professores2 = new Professores
            {
                Id = professores1.Id
            };
            professores1.Should().Be(professores2);
            professores2.Id = 2L;
            professores1.Should().NotBe(professores2);
            professores1.Id = 0;
            professores1.Should().NotBe(professores2);
        }
    }
}
